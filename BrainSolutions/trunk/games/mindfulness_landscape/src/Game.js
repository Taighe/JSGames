Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.timer;
	this.audioMenu = null;
	this.background = null;
	this.meditation = 150;
	this.minWidth = null;
	this.minHeight = null;
}

Brain.Game.prototype = 
{
	init: function() 
	{
		var game = Brain.game;
		this.audioMenu = new AudioBar();

	},
	create: function() 
	{
		var game = Brain.game;
		console.log("Game created");
		console.log(this);
		this.isDebug = false;
		this.gameReady = false;
		game.input.enabled = true;
	    this.background = game.add.sprite(0, 0, Brain.background);
	    this.background.width = game.width;
	    this.background.height = game.height;
	    this.background.anchor.set(0.5, 0.5);
	    this.background.centerX = Brain.centerX;
	    this.background.centerY = Brain.centerY;
		this.meditation = 200;
	    this.minWidth = game.width * 2;
	    this.minHeight = game.height;

	    var menu = SelectionMenu.DisplayTopMenu();
	    var options = [new Option("START SESSION", this.StartSession, this)];

	    Alert.Create("Find a peaceful location to avoid distractions.\n\nCheck your sound is on and use headphones if possible.", options, game.width / 2, game.height  *0.3, menu.audioPath);
	},
	
	Cancel: function()
	{

	},

	update: function() 
	{
		var game = Brain.game;
		var percent = this.audioMenu.Update();

		this.background.width = this.minWidth + (percent * this.meditation);
		this.background.height = this.minHeight + (percent * this.meditation);
		if(percent >= 1)
		{
			game.state.start("Result");
		}
	},

	gofull: function() 
	{
		if (this.scale.isFullScreen) 
		{
			this.scale.stopFullScreen();
			//this.fullscreenbutton.visible = true;
		} 
		else 
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

	StartSession: function()
	{
		console.log("session start");
		var game = Brain.game;
		var session = this.game;
		var OnBack = function()
		{
			var OnEnd = function()
			{
				this.audioMenu.Destroy();
				Alert.Dismiss()
				game.state.start("TimeSelection");
			}
			var OnCancel = function(){Alert.Dismiss()}

			var options = [new Option("CANCEL", OnCancel, this), new Option("END SESSION", OnEnd, this)];
			console.log(options);
			Alert.Create("Are you sure you want to end the session now?\n\nThis will take you back to the Time Selection Menu.", options, game.width / 2, game.height  *0.3, null);
		}

		var backbutton = new Brain.AddButton("", game.width * 0.05, game.height *0.05, OnBack, this, "back", 30, 30, 0.5 , 0.5, 1);	
		Brain.bgMusic.fadeTo(1* 1000, 0.2);
		console.log(this.game);
	    this.audioMenu.Init(Alert.audio, Brain.sessionTime);
	    Alert.Dismiss()
	}
};