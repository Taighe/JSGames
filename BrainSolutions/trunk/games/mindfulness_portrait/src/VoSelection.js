Brain.VoSelection = function(game) 
{
	this.timer;
};

Brain.VoSelection.prototype = 
{
	create: function() 
	{
	    var game = Brain.game;

	    var graphic = Brain.AddSprite("bg1", 0, 0, game.width, game.height, 0.5, 0.5, false);
	    graphic.centerX = Brain.centerX;
		graphic.centerY = Brain.centerY;
	    console.log(game.width);
		SelectionMenu.Init();
		this.timer = game.time.create(true);
		//this.fullscreen = new Brain.AddButton("", game.width * 0.1, game.height * 0.08, this.gofull, this, "full-screen", 100, 100, 0.5, 0.5, 1);
		//this.timer.add(1 * 1000, tween, this);
		//this.timer.start();
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