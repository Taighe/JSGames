Brain.Play = function(game) 
{
	// Default game variabels
	this.isDebug = null;
	this.gameReady = false;
	this.timer = null;
	this.miscTimer = null;
	this.duration = 61; // Duration of exercise in seconds
	this.level = null;
	this.levelSprite = null;
	this.score = null;
	this.gameScreen = null;
	//
	this.grid = null;
	this.instructionsText = null;
};

Brain.Play.prototype = 
{
	init: function(instructions, level, brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame
		this.instructionsText = instructions;

		if(this.instructionsText == undefined)
		{
			console.log("no instruct")
			this.instructionsText = new Phaser.Text(game, 0,0,"");
		}

		this.level = level
		this.instructionsText.centerX = Brain.centerX;
		this.instructionsText.centerY = game.height * 0.065;
		game.add.existing(this.instructionsText);
	},
	create: function() 
	{
		// default
		console.log("game created");
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		var game =Brain.game;
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.gameScreen = Brain.game.add.group();
		this.timer = Brain.game.time.create(false);
		this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.timer.start();
		this.timer.pause();
		this.miscTimer.start();
		HudManager.Init(this);
		var circle = Brain.AddSprite("center-circle", Brain.game.width / 2, Brain.game.height / 2, 250, 250, 0.5, 0.5, false);
		var levelText = Brain.AddText("LEVEL", circle.centerX, circle.y - circle.height / 4.6, Color.gray, 40, 0.5, 0.5, "normal", 500, "LatoRegular");
		this.levelSprite = Brain.AddText("1", circle.centerX, circle.y + circle.height / 15, Color.gray, 120, 0.5, 0.5, "bold", 500, "LatoRegular");
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(circle);
	 	this.levelStartScreen.add(levelText);
	 	this.levelStartScreen.add(this.levelSprite);
	 	this.gameScreen = Brain.game.add.group();
	 	this.gameScreen.visible = false;
		this.score = 0;
		this.correct= false;
	 	//
		this.grid = new Grid();
		this.gameScreen.add(this.grid.group);
		this.s_lose = Brain.game.add.audio("s_lose");
		this.info = Brain.AddText("", game.width / 2, game.height * 0.3, Color.gray, 42, 0.5, 0.5, "bold", 1000, "LatoRegular");
		this.instructionsText.alpha = 1;
	},
	InstructionsFade: function()
	{
		console.log("fade")
		var fade = Brain.TweenFade(this.instructionsText, 0, true, 1, 0);
		fade.delay = 1*1000;
	},
	Init: function()
	{
		console.log("game init");
		Brain.NumberGamesPlayed++;
		this.grid.Create(this, 0, 0, this.level);
	 	this.grid.Init();
	 	this.info.bottom = this.gameScreen.top - 50;
	},

	update: function() 
	{
		// default
		HudManager.Update();
		//
	},

	LevelStart: function()
	{		
		// default
		this.levelStartScreen.visible = false;
		this.gameScreen.visible = true;
		this.gameReady = true;
		this.Init();
		this.timer.resume();
		//
	},

	LevelDelay: function()
	{			
		// default
		this.levelStartScreen.visible = true;
		this.info.text = "";
		this.gameScreen.visible = false;
		this.levelSprite.text = this.level;
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
		// 
	},
	DisplayMatch()
	{
		var game = Brain.game;
		this.InstructionsFade();
		this.info.text = "MATCH";
		var dismiss = function()
		{
			Brain.TweenFade(this.info, 0, true, 0.5, 0);
		}
		var timer = game.time.create(true);
		timer.add(1* 1000, dismiss, this);
		this.info.alpha = 0;
		Brain.TweenFade(this.info, 1, true, 0.5, 0);
		timer.start();
	},
	LevelEnd: function()
	{		
		// default

		this.gameReady = false;
		this.timer.pause();
		this.miscTimer.add(2 * 1000, this.LevelDelay, this);
		//
		this.score += this.grid.GetBonusScore();

		//this.level += 1;

		this.miscTimer.add(2 * 1000, this.ExerciseEnd, this);

	},

	ExerciseEnd: function()
	{
		// default
		var game = Brain.game;
		game.state.start("Result", true, false, this, "You are one step closer to improving your memory.", this.brainGame);
		this.timer.destroy();
		this.miscTimer.destroy();
		this.gameScreen.visible = false;
		HudManager.Free();
		//
	},

	gofull: function() 
	{
		if (this.scale.isFullScreen) 
		{
			this.scale.stopFullScreen();
			//this.fullscreenbutton.visible = true;
		} else 
		{
			this.scale.startFullScreen(false);
			//this.fullscreenbutton.visible = false;
		}
	},

	exitPress: function () 
	{
	    Brain.popup = new PopUp(this.game);

	    Brain.popup.create("Are you sure you want to exit the test now?", "", ["YES, EXIT NOW", "RETURN TO TEST"], [this.exit, this.unpause], 3);
	},

	unpause: function (event) 
	{
	    if (event.game.paused == true) 
	    {
	        event.game.paused = false;
	    }
	},

	exit: function () 
	{
	    window.location = this.exitURL;
	},
};