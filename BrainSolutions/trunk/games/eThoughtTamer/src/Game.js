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
	this.pages = []
	this.pages["Game"] = null;
	this.pages["PickAThought"] = null;
	//
};

Brain.Game.prototype = 
{
	init: function(menu)
	{
		// default

		var game = Brain.game;
		if(this.pages["Game"] == null)
		{
			console.log("init");
			this.score = 0;
			this.level = 1;
			this.timer = Brain.game.time.create(false);
			this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
			this.miscTimer = Brain.game.time.create(false);
			this.miscTimer.add(0, this.LevelDelay, this);
			this.miscTimer.start();
			//HudManager.Init(this);
		 	this.levelStartScreen = Brain.game.add.group();

			this.levelStartScreen.visible = false;

		 	this.levelStartScreen.centerX = Brain.centerX;
		 	this.levelStartScreen.centerY = Brain.centerY;
		 	this.gameScreen = Brain.game.add.group();
		 	this.gameScreen.visible = false;
		 	this.manager = new GameManager(this);
		 	this.gameScreen.add(this.manager);
		 	//
		 	
		 	this.pages["Game"] = this;
		}

		this.Visible(true)
		this.manager.Init();
		if(menu == true)
		{
			this.manager.topMenu.Init()
			
			this.manager.DisplayBeasts();
		}
	},
	create: function() 
	{
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
	},
	Visible: function(visible)
	{
		this.levelStartScreen.visible = visible
		this.gameScreen.visible = visible
	},
	update: function() 
	{
		// default
		//HudManager.Update();
		//
		this.manager.Update();
	},
	DisplayLevel: function()
	{
		var game = Brain.game;

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
		this.gameScreen.visible = false;

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

	ExerciseEnd: function()
	{
		// default
		var game = Brain.game;
		game.state.start("Result", false, false, this);
		this.timer.destroy();
		this.miscTimer.destroy();
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