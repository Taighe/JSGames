Brain.Splash = function(game) 
{
	this.timer;
};

Brain.Splash.prototype = 
{
	create: function() 
	{
	    var game = Brain.game;

	    var play = function()
	    {
	    	Brain.bgMusic.fadeIn(2*1000, true);
	    }
	    Brain.bgMusic = game.add.audio("bg_music");
	    Brain.bgMusic.onDecoded.add(play, this);
	    game.stage.backgroundColor = Color.white;
	    var centerX = game.width / 2;
	    var topY = game.height / 2.2;
	    var middleY = game.height  - (game.height  / 3);
	    var bottomY = game.height  - (game.height  / 15);
	    var spacing = 50;

	    var graphic = Brain.AddSprite("bg1", 0, 0, game.width, game.height, 0.5, 0.5, false);
	    graphic.centerX = Brain.centerX;
		graphic.centerY = Brain.centerY;
	    var titleSprite = Brain.AddText("Mindfulness Meditation", centerX, topY - 20, Color.white, 32, 0.5, 0.5, "bold", 1000, "LatoRegular");
	    titleSprite.alpha = 0;

	    var changeScreen = function()
	    {
	    	game.state.start('VoSelection');
	    }

	    var tween = function()
	    {
	    	Brain.TweenFade(titleSprite, 0);
		    
	    	this.timer.add(0.8 * 1000, changeScreen, this);
	    }

		this.timer = game.time.create(true);
		Brain.TweenFade(titleSprite, 1, true, 0);
		this.timer.add(3 * 1000, tween, this);
		this.timer.start();
	},

	getRandomInt(min, max) 
	{
		return Math.floor(Math.random() * (max - min)) + min;
	},

	update: function() 
	{

	},

	render: function() 
	{
		this.RenderDebugText();
	},

	RenderDebugText: function() 
	{
		if (this.isDebug) 
		{
			this.game.debug.text("Snap pressed: " + this.snapPressed, 50, 50);
			this.game.debug.text("Snaps Correct: " + this.snapCorrect, 50, 100);
			this.game.debug.text("Current Cycle: " + this.currentCycle, 50, 150);
		}

	},

	gofull: function() {
		if (this.scale.isFullScreen) {
			this.scale.stopFullScreen();
			//this.fullscreenbutton.visible = true;
		} else {
			this.scale.startFullScreen(false);
			//this.fullscreenbutton.visible = false;
		}
	},

	exitPress: function () {
	    //Brain.popup = new PopUp(this.game);

	    //Brain.popup.create("Are you sure you want to exit the test now?", "", ["YES, EXIT NOW", "RETURN TO TEST"], [this.exit, this.unpause], 3);
	},

	unpause: function (event) {
	    if (event.game.paused == true) 
	    {
	        event.game.paused = false;
	    }
	},

	exit: function () {
	    window.location = this.exitURL;
	},

	getRandomInt(min, max) 
	{
	    return Math.floor(Math.random() * (max - min)) + min;
	},


};