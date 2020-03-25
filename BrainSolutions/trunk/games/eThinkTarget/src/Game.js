Brain.Game = function(game) 
{
	// Default game variabels
	this.isDebug = null;
	this.gameReady = false;
	this.timer = null;
	this.miscTimer = null;
	this.duration = 1; // Duration of exercise in seconds
	this.level = null;
	this.maxlevel = 10;
	this.levelSprite = null;
	this.score = null;
	this.correct = false;
	this.index = 0
	this.brainGame = null
	//
};

Brain.Game.prototype = 
{
	init: function( brainGame)
	{
		var game = Brain.game;
		this.index = 0
		this.brainGame = brainGame
		var i1 = new Phaser.Text(game, 0, 0, "Press and hold down to align the bow & arrow.", {fontSize: 32, font:"LatoRegular", fontWeight: "normal", fill:Color.white, wordWrap: true, wordWrapWidth: 500});
		i1.align = "center"
		var i2 = new Phaser.Text(game, 0, 0, "Consider wind direction, gravity and position to time your shot.", {fontSize: 32, font:"LatoRegular", fontWeight: "normal", fill:Color.white, wordWrap: true, wordWrapWidth: 500});
		i2.align = "center"
		var i3 = new Phaser.Text(game, 0, 0, "Release the arrow by lifting your finger.", {fontSize: 32, font:"LatoRegular", fontWeight: "normal", fill:Color.white, wordWrap: true, wordWrapWidth: 500});
		i3.align = "center"
		var instructionsGame = [i1, i2, i3];
		this.instructions = instructionsGame
		this.instructTimer = game.time.create(true)
		this.instructTimer.loop(5* 1000, this.NextInstruction, this)
		this.instructTimer.start()
		this.instructions[this.index].centerX = game.width * 0.5;
		this.instructions[this.index].y = game.height * 0.2;
	},
	create: function() 
	{
		this.isDebug = false;
		var game = Brain.game;
		console.log("create");
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		this.manager = new GameManager(this);
		this.Init();
		game.add.existing(this.instructions[this.index])
	},

	Init: function()
	{
		// default
		this.score = 0;
		this.level = 1;
		Brain.NumberGamesPlayed++;
		this.timer = Brain.game.time.create(false);
		this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
		this.timer.start()
		this.timer.pause()
		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.miscTimer.start();
		HudManager.Init(this);
		HudManager.timerSprite.visible = false
		HudManager.timeSprite.visible = false
		HudManager.graphics.visible = false
		HudManager.ripple.visible = false
		var circle = Brain.AddSprite("targetBoard", 0, 0, 450, 450, 0.5, 0.5, false);
		this.levelText = Brain.AddText("ROUND " + this.level + " of 10", circle.centerX, circle.bottom + 55, Color.black, 40, 0.5, 0.5, "normal", 500, "LatoRegular");

	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(circle);
	 	this.levelStartScreen.add(this.levelText);
	 	this.levelStartScreen.centerX = Brain.centerX;
	 	this.levelStartScreen.centerY = Brain.centerY;
	 	this.gameScreen = Brain.game.add.group();
	 	this.gameScreen.add(this.manager);

	 	//
	},
	NextInstruction: function()
	{
		this.InstructionsFade() 
		this.index++
		this.index = MinMax(this.index, 0, this.instructions.length - 1)
	},
	InstructionsFade: function()
	{
		var game = Brain.game
		if(this.index < this.instructions.length)	
		{	
			this.index = MinMax(this.index, 0, this.instructions.length - 1)
			this.instructions[this.index].alpha = 1
			var fade = Brain.TweenFade(this.instructions[this.index], 0, true, 1, 0);
			fade.delay = 1*1000;
			var next = function()
			{
				if(this.instructions[this.index] != undefined)
				{
					this.instructions[this.index].centerX = game.width * 0.5;
					this.instructions[this.index].y = game.height * 0.2;
					game.add.existing(this.instructions[this.index]);
				}
			}
			if(this.index < this.instructions.length)	
				fade.onComplete.add(next, this)
		}
		else
		{
			this.instructTimer.stop()
		}
	},
	update: function() 
	{
		// default
		HudManager.Update();
		//
	},
	DisplayLevel: function()
	{
		var game = Brain.game;
		this.levelText.text = "ROUND " + this.level + " OF 10";
	},
	LevelStart: function()
	{		
		var game = Brain.game

		// default
		this.gameScreen.visible = true;
		this.instructions[this.index].visible = true
		this.manager.Visible(true);
		this.levelStartScreen.visible = false;
		this.gameReady = true;
		this.manager.Init();

	 	this.manager.Init( 5 * this.level);
		//
	},

	LevelDelay: function()
	{			
		// default
		HudManager.timerSprite.visible = false
		HudManager.timeSprite.visible = false
		HudManager.graphics.visible = false
		HudManager.ripple.visible = false
		this.gameScreen.visible = false;
		this.instructions[this.index].visible = false
		HudManager.scoreSprite.fill = Color.purple
		this.manager.Visible(false);
		this.levelStartScreen.visible = true;
		this.DisplayLevel();
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
		// 
	},

	LevelEnd: function()
	{		
		// default
		this.gameReady = false;

		this.timer.pause();
		this.level += 1;
		this.miscTimer.add(2 * 1000, this.LevelDelay, this);
		// 
		if(this.level > 10)
		{
			this.level = 10
			this.miscTimer.removeAll()
			this.miscTimer.add(2 * 1000, this.ExerciseEnd, this);
		}
	},

	ExerciseEnd: function()
	{
		// default
		var game = Brain.game;
		game.state.start("Result", true, false, this, "You are one step closer to improved planning and multi-tasking.", this.brainGame);
		this.manager.Visible(false)
		this.timer.destroy();
		this.miscTimer.destroy();
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