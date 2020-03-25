Brain.Game = function(game) 
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
	this.correct = false;
	this.index = 0
	this.gauntlet = null;
	this.brainGame = null
	//
};

Brain.Game.prototype = 
{
	init: function( brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame
		var properties = {fontSize: 26, fontWeight: "normal", fill: Color.black, wordWrap: true, wordWrapWidth: 600, font: "LatoRegular"}
		this.index = 0
		var instructionsText1 = new Phaser.Text(game, 0,0, "Move the sling around the gauntlet.", properties);
		instructionsText1.align = "center"
		instructionsText1.wordWrapWidth = 500
		instructionsText1.wordWrap = true
		var instructionsText2 = new Phaser.Text(game, 0,0, "Estimate the position and timing required to hit the target.", properties);
		instructionsText2.align = "center"
		instructionsText2.wordWrapWidth = 500
		instructionsText2.wordWrap = true
		var instructionsGame = [instructionsText1, instructionsText2]
		this.instructions = instructionsGame;

		this.instructTimer = game.time.create(true)
		this.instructTimer.loop(5* 1000, this.InstructionsFade, this)
		this.instructTimer.start()
		this.instructions[this.index].centerX = game.width * 0.5;
		this.instructions[this.index].centerY = game.height * 0.2;
		game.add.existing(this.instructions[this.index]);

	},
	create: function() 
	{
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;

		this.Init();
	 	this.DisplayLevel();
	},

	Init: function()
	{
		// default
		var game = Brain.game;
		Brain.NumberGamesPlayed++;
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
		this.circle = Brain.AddSprite("center-circle", Brain.game.width / 2, Brain.game.height * 0.1, 150, 150, 0.5, 0.5);
		this.levelText = Brain.AddText("LEVEL", this.circle.centerX, this.circle.y - this.circle.height / 4.6, Color.gray, 20, 0.5, 0.5, "normal", 1000, "LatoRegular");

		this.levelSprite = Brain.AddText("1", this.circle.centerX, this.circle.y + this.circle.height / 15, Color.gray, 70, 0.5, 0.5, "bold", 1000, "LatoRegular");
		this.levelSprite.fontWeight = "bold";

	 	this.gameScreen = Brain.game.add.group();
	 	this.gauntlet = new Gauntlet(this);
	 	this.gameScreen.add(this.gauntlet.group);
	 	this.gauntlet.group.centerY = game.height * 0.6
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(this.circle);
	 	this.levelStartScreen.add(this.levelText);
	 	this.levelStartScreen.add(this.levelSprite);
	 	//
		//this.instructions[this.index].bringToTop();
	},

	update: function() 
	{
		// default
		HudManager.Update();
		//
		this.gauntlet.Update();
	},

	LevelStart: function()
	{		
		// default
		this.gameScreen.visible = true;
		this.gameReady = true;
		this.timer.resume();

		//
	},

	LevelDelay: function()
	{			
		// default
		this.levelStartScreen.visible = true;
		this.gameScreen.visible = false;
		this.levelSprite.text = this.level;
		this.miscTimer.add(0 * 1000, this.LevelStart, this);
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
	},
	DisplayLevel: function()
	{
		var game = Brain.game;
		var tweenManager = new Phaser.TweenManager(game);
		this.levelStartScreen.alpha = 0;
		this.circle.width = 0;
		this.circle.height = 0;
		var dismiss = function()
		{
			var fade = game.add.tween(this.levelStartScreen);
			fade.to({alpha: 0}, 0.2 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		}
		var timer = game.time.create(true);
		this.levelSprite.text = this.level;
		var tweenScale = game.add.tween(this.circle, tweenManager);
		tweenScale.to({width: 150, height: 150}, 1 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
		var wordScale = game.add.tween(this.levelText.scale, tweenManager);
		wordScale.to({x: 1, y: 1}, 0.5 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
		var lvlScale = game.add.tween(this.levelSprite.scale, tweenManager);
		lvlScale.to({x: 1, y: 1}, 0.5 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
		var tweenFade = game.add.tween(this.levelStartScreen, tweenManager);
		tweenFade.to({alpha: 1}, 0.2 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		timer.add(0.8 * 1000, dismiss, this);
		timer.start();
	},
	LevelUp: function()
	{
		this.gauntlet.UpdateBlockers();
		this.level += 1;
		this.level = MinMax(this.level, 1, 999);
		this.DisplayLevel();

	},
	LevelDown: function()
	{
		this.level -= 1;
		this.level = MinMax(this.level, 1, 999);
		this.DisplayLevel();
	},
	InstructionsFade: function()
	{
		var game = Brain.game
		if(this.index < this.instructions.length)	
		{	this.instructions[this.index].alpha = 1
			var fade = Brain.TweenFade(this.instructions[this.index], 0, true, 1, 0);
			fade.delay = 1*1000;
			this.index++
			var next = function()
			{
				this.instructions[this.index].centerX = game.width * 0.5;
				this.instructions[this.index].centerY = game.height * 0.2;
				game.add.existing(this.instructions[this.index]);
			}
			if(this.index < this.instructions.length)	
				fade.onComplete.add(next, this)
		}
	},
	ExerciseEnd: function()
	{
		// default
		var game = Brain.game;
		game.state.start("Result", true, false, this, "You are one step closer to discovering a more focused life.", this.brainGame);
		this.timer.destroy();
		this.miscTimer.destroy();
		HudManager.Free();
		this.gameScreen.visible = false
		//
		this.gauntlet.Free();
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