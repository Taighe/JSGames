Brain.Game = function(game) 
{
	// Default game variabels
	this.isDebug = null;
	this.gameReady = false;
	this.timer = null;
	this.miscTimer = null;
	this.duration = 61; // Duration of exercise in seconds
	this.answerDuration = 10;
	this.level = null;
	this.levelSprite = null;
	this.score = null;
	this.correct = false;
	this.grid = null;
	this.answerTimer;
	//
};

Brain.Game.prototype = 
{
	init: function(brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame
		var instructionsText = new Phaser.Text(game, 0,0, "Touch and drag to highlight the positive word.", {fontSize: 26, fontWeight: "normal"});
		this.instructionsText = instructionsText;
		this.instructionsText.centerX = Brain.centerX;
		this.instructionsText.centerY = game.height * 0.15;
		
		game.add.existing(this.instructionsText);
	},
	create: function() 
	{
		var game = Brain.game;
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		this.s_lose = Brain.game.add.audio("s_lose");
		this.s_win = Brain.game.add.audio("s_win");
		this.answerTimer = game.time.create(false);
		// default
		this.score = 0;
		this.level = 1;
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

	 	this.levelStartScreen = Brain.game.add.group();
 		this.gameScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(circle);
	 	this.levelStartScreen.add(levelText);
	 	this.levelStartScreen.add(this.levelSprite);
	 	this.gameScreen.visible = false;
	 	//
	 	this.grid = new Grid(this, game.width / 2, game.height / 2);
	 	this.loaderBack = Brain.AddSprite("loader-back", game.width * 0.5, game.height * 0.5, 400, 400, 0.5, 0.5, false);
	 	this.loader = Brain.AddSprite("loader", game.width * 0.5, game.height * 0.5, 400, 400, 0.5, 0.5, false);
	 	this.mask = game.add.graphics(game.width * 0.5,game.height * 0.5);
	 	this.mask.lineStyle(200, Color.blackHex, 200);
	 	this.loader.mask = this.mask;

	 	this.gameScreen.add(this.loaderBack);
	 	this.gameScreen.add(this.loader);
	},

	InstructionsFade: function()
	{
		var fade = Brain.TweenFade(this.instructionsText, 0, true, 1, 0);
		fade.delay = 1*1000;
	},
	Init: function()
	{
		var game = Brain.game;
		console.log("init");
		Brain.NumberGamesPlayed++;
		this.correct = false;
		this.loader.tint = Color.purpleHex;
		this.mask.destroy();
		this.mask = game.add.graphics(game.width * 0.5,game.height * 0.5);
		this.mask.lineStyle(250, Color.blackHex, 1)
		this.loader.mask = this.mask;
	 	this.mask.angle = -90;
		this.grid.Init();
	 	this.gameScreen.add(this.grid.group);
	 	this.loaderBack.width = this.grid.group.width * 1.3;
	 	this.loaderBack.height = this.grid.group.height;
	 	this.loader.width = this.grid.group.width* 1.3;
	 	this.loader.height = this.grid.group.height;
	},

	update: function() 
	{
		// default
		HudManager.Update();
		//
		var game = Brain.game;
		if(this.answerTimer != null)
		{
	        var currentTime = this.answerTimer.ms / 1000;
	    	var percent = currentTime / this.answerDuration;
	    	percent = Phaser.Math.clamp(percent, 0.00001, 0.99999);
	    	console.log(percent);
		 	this.mask.arc(0, 0, 250, 0, (Math.PI * 2) * percent, false);
		}

	},

	LevelStart: function()
	{		
		var game = Brain.game;
		this.answerTimer.destroy();
		this.answerTimer = game.time.create(false);
		this.answerTimer.add(this.answerDuration * 1000, this.LevelEnd, this);
		this.answerTimer.start();
		// default
		this.levelStartScreen.visible = false;
		this.gameScreen.visible = true;
		this.gameReady = true;
		this.timer.resume();
		this.Init();
		//
	},

	LevelDelay: function()
	{			
		// default
		var game = Brain.game;
		this.answerDuration = 10 - 9 * this.level / 15
		game.input.enabled = true;
		this.grid.Free();
		this.levelStartScreen.visible = true;
		this.gameScreen.visible = false;
		this.levelSprite.text = this.level;
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
		// 
	},

	LevelEnd: function()
	{		
		// default
		var game = Brain.game;
		game.input.enabled = false;
		this.gameReady = false;
		this.InstructionsFade();
		this.timer.pause();
		if(this.correct == true)
		{
			this.level += 1;
			this.s_win.play();
			this.loader.tint = Color.greenHex;
		}
		else
		{
			this.level -= 1;
			this.s_lose.play();
			this.grid.RevealWord();
			this.loader.tint = Color.redHex;
			this.grid.info.text = "TIME'S UP!";
			this.grid.info.addColor(Color.red, 0);
			var info = this.grid.info;
			info.scale.set(0);
			var tween = game.add.tween(info.scale);
			tween.to({x:1.1, y: 1.1}, 1* 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
		}
		this.answerTimer.stop();
		this.level = MinMax(this.level, 1, 999);

		this.miscTimer.add(2 * 1000, this.LevelDelay, this);
		// 
	},

	ExerciseEnd: function()
	{
		// default
		var game = Brain.game;
		game.state.start("Result", true, false, this, "You are one step closer to discovering a more positive life.", this.brainGame);
		this.timer.destroy();
		this.miscTimer.destroy();
		HudManager.Free();
		//
		this.grid.Free();
		this.loaderBack.destroy();
		this.loader.destroy();
		this.mask.destroy();
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