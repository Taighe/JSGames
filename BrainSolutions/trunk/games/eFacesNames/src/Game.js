Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.timer;
	this.miscTimer;
	this.answerTimer;
	this.answerDuration = 100;
	this.duration = 13; // Duration of exercise in seconds
	this.level = 1;
	this.clockwise = true;
	this.face = null;
	this.bubbleEmotions = [];
	this.maxBubbleCount;
	this.count;
	this.correct = false;
};

Brain.Game.prototype = 
{
	init: function( brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame
	},
	create: function() 
	{
		this.s_lose = Brain.game.add.audio("s_lose");
		this.s_win = Brain.game.add.audio("s_win");
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		var game = Brain.game;
		var temp = Brain.game.add.sprite(0, 0, "hud");
		temp.width = Brain.game.width;
		temp.height = Brain.game.height;
		temp.alpha = 0;
		this.timer = Brain.game.time.create(false);
		this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
		this.timer.start();
		this.timer.pause();
		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.answerTimer = Brain.game.time.create(false);
		//this.answerTimer.add(this.answerDuration * 1000, this.LevelEnd, this);
		var circle = Brain.AddSprite("center-circle", 0, 0, 250, 250, 0.5, 0.5, false);
		this.levelText = Brain.AddText("LEVEL", circle.centerX, circle.y - circle.height / 4.6, Color.gray, 40, 0.5, 0.5, "normal", 500, "LatoRegular");
		this.levelSprite = Brain.AddText("1", circle.centerX, circle.y + circle.height / 15, Color.gray, 120, 0.5, 0.5, "bold", 500, "LatoRegular");
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(circle);
	 	this.levelStartScreen.add(this.levelText);
	 	this.levelStartScreen.add(this.levelSprite);
	 	this.levelStartScreen.add(this.levelSprite);
	 	this.levelStartScreen.centerX = Brain.centerX;
	 	this.levelStartScreen.centerY = Brain.centerY;
		this.gameScreen = game.add.group();
	 	this.manager = new GameManager(this);
	 	this.gameScreen.add(this.manager.group);
 		this.gameScreen.visible = false;
		this.Init();
	},

	Init: function()
	{
		this.score = 0;
		this.level = 1;
		this.miscTimer.start();
		HudManager.Init(this);
	},
	update: function() 
	{
		HudManager.Update();
        var currentTime = this.answerTimer.ms / 1000;
    	var percent = currentTime / this.answerDuration;
    	this.manager.Update();
		//this.pie.progress = percent;
		//this.pie.UpdateProgress();
	},

	LevelStart: function()
	{		
		this.gameScreen.visible = true;
		this.gameReady = true;

		this.manager.Intro();

	},

	LevelDelay: function()
	{			
		this.correct = false;
		this.manager.Init();
		this.duration = 13;
		this.gameScreen.visible = false;
		this.DisplayLevel();
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
	},

	LevelEnd: function()
	{		
		console.log("level end");
		var game = Brain.game;
		this.gameReady = false;

		this.level += 1;

		if(this.level > 10)
		{
			this.level = 10
			this.ExerciseEnd();
		}
		this.level = MinMax(this.level, 1, 999);
		this.timer.pause();
		this.answerTimer.pause();

		this.miscTimer.add(1 * 1000, this.LevelDelay, this);
	},

	DisplayLevel: function()
	{
		var game = Brain.game;
		this.levelStartScreen.alpha = 0;
		this.levelStartScreen.scale.setTo(0);
		this.levelSprite.text = this.level;
		var tween = game.add.tween(this.levelStartScreen.scale);
		var fade = game.add.tween(this.levelStartScreen);
		tween.to({x: 1, y: 1}, 1* 1000, Phaser.Easing.Elastic.Out, true, 0, 0, true);
		fade.to({alpha: 1}, 0.2* 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
		fade.to({alpha: 0}, 0.2* 1000, Phaser.Easing.Linear.None, false, 0.8*1000, 0, false);
		fade.start();
	},
	ExerciseEnd: function()
	{
		var game = Brain.game;
		game.state.start("Result", false, false, this, "You are one step closer to improving your memory.", this.brainGame);
		this.manager.Free()
		this.timer.destroy();
		this.miscTimer.destroy();
		HudManager.Free();
		this.gameScreen.destroy();
		this.levelStartScreen.destroy();
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