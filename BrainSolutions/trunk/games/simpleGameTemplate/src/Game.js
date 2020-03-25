Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.timer;
	this.miscTimer;
	this.duration = 61; // Duration of exercise in seconds
	this.level = 1;
	this.clockwise = true;
	this.count;
	this.correct = false;
};

Brain.Game.prototype = 
{
	create: function() 
	{
		this.s_lose = Brain.game.add.audio("s_lose");
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		var game = Brain.game;

		this.timer = Brain.game.time.create(false);

		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.answerTimer = Brain.game.time.create(false);
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
 		this.gameScreen.visible = false;
 		this.manager = new GameManager(this);
 		this.gameScreen.add(this.manager);
		this.Init();
	},

	Init: function()
	{
		this.score = 0;
		this.level = 1;
		this.miscTimer.start();
		this.manager.Init();

	},
	update: function() 
	{
		this.manager.Update();
	},

	LevelStart: function()
	{		
		this.gameScreen.visible = true;
		this.gameReady = true;

	},

	LevelDelay: function()
	{			
		this.correct = false;
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
		if(this.correct == true)
		{
			this.level += 1;
		}
		else
		{
			//this.level -= 1;		
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
		game.state.start("Result", false, false, this);
		this.timer.destroy();
		this.miscTimer.destroy();
		this.gameScreen.destroy();
		this.levelStartScreen.destroy();
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