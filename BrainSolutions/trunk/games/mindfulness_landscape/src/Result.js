Brain.Result = function()
 {
	this.isDebug;
	this.gameReady = false;
	this.background = null;
	this.fade = null;
	this.group = null;
};

Brain.Result.prototype = 
{
	create: function() 
	{
		var game = Brain.game;
		this.isDebug = false;
		this.group = game.add.group();
	    this.background = game.add.sprite(0, 0, Brain.background);
	    this.background.width = game.width * 2;
	    this.background.height = game.height;
	    this.background.anchor.set(0.5, 0);
	    this.fade = Brain.AddSprite("whitePix", 0, 0, game.width, game.height);
	    this.fade.tint = Color.blackHex;
	    this.fade.alpha = 0.5;

	    var completeText = Brain.AddText("YOUR SESSION IS COMPLETE", this.background.centerX, this.game.height / 10, Color.white, 28, 0.5, 0.5, "normal", 1000, "LatoRegular");
	    completeText.centerX = game.width / 2;
	    var onMain = function()
	    {
	    	SelectionMenu.PopMenu();
	    	game.state.start("VoSelection");
	    }
	    var button = new Brain.AddButton("MAIN MENU", game.width / 2, completeText.bottom + 60, onMain, this, "button", 250, 60, 0.5, 0.5, 32);
	    var line = Brain.AddSprite("whitePix", 0, button.bottom + 50, game.width, 1, 0.5, 0.5, false);
	    line.centerX = game.width /2;
		this.group.add(this.background);
		this.group.add(this.fade);
		this.group.add(this.background);
		this.group.add(completeText);
		this.group.add(button);
		this.group.add(line);

		Brain.TweenFade(this.group, 1, true, 1*1000);
	},

	update: function() 
	{

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

	unpause: function (event) {
	    if (event.game.paused == true) {
	        event.game.paused = false;
	    }
	},

	exit: function () {
	    window.location = this.exitURL;
	}
};