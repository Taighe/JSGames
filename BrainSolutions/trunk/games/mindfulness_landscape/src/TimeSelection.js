Brain.TimeSelection = function(game) 
{
	this.timer;
};

Brain.TimeSelection.prototype = 
{
	create: function() 
	{
	    var game = Brain.game;
	    Brain.bgMusic.fadeTo(1* 1000, 1);
	    game.stage.backgroundColor = Color.white;
	    var graphic = game.add.sprite(0, 0, Brain.background);
	    graphic.width = game.width;
	    graphic.height = game.height;
	    graphic.anchor.set(0.5, 0.5);
	    graphic.centerX = Brain.centerX;
	    graphic.centerY = Brain.centerY;
		var menu = SelectionMenu.DisplayTopMenu();
		var group = game.add.group();
		group.inputEnableChildren = true;
		var title = Brain.AddText(menu.Title, game.width / 2, game.height *0.15, Color.white, 42, 0.5, 0.5, "bold", 800, "LatoRegular");
		var lineSprite = Brain.AddSprite("whitePix", game.width / 2, title.centerY + title.height, game.width * 0.6, 1, 0.5, 0, false);
		Brain.TweenLineIn(lineSprite, game.width * 0.6, 1);
		var step = Brain.AddText("STEP 2: Choose length of session", game.width / 2, lineSprite.centerY + 50, Color.white, 21, 0.5, 0.5, "normal", 800, "LatoRegular");
		step.addColor(Color.lightGray, 7);
		var goBack = function()
		{
			SelectionMenu.PopMenu();
			game.state.start('VoSelection');
		};
		
		var back = Brain.AddSprite("whitePix", 0, 0, game.width, game.height, 0, 0, false);
		back.tint = Brain.black;

		back.alpha = 0.5;
		step.alpha = 0;

		// Time selection
		var five = function()
		{
			Brain.sessionTime = 5;
			game.state.start('Game');
		};
		var ten = function()
		{
			Brain.sessionTime = 10;
			game.state.start('Game');
		};
		var twenty = function()
		{
			Brain.sessionTime = 20;
			game.state.start('Game');
		};
		var fiveMin = new Brain.AddButton("", 0, game.height * 0.55, five, this, "5min", 180, 180, 0.5, 0.5, 1);	
		var tenMin = new Brain.AddButton("", fiveMin.right, game.height * 0.55, ten, this, "10min", 180, 180, 0.5, 0.5, 1);
		tenMin.left = fiveMin.right + 65;	
		var twentyMin = new Brain.AddButton("", tenMin.right, game.height * 0.55, twenty, this, "20min", 180, 180, 0.5, 0.5, 1);	
		twentyMin.left = tenMin.right + 65;
		//
		var options = game.add.group();
		options.inputEnableChildren = true;
		options.add(fiveMin);
		options.add(tenMin);
		options.add(twentyMin);
		options.centerX = game.width / 2;
		var backbutton = new Brain.AddButton("", game.width * 0.05, game.height *0.05, goBack, this, "back", 30, 30, 0.5, 0.5, 1);	
		group.add(back);
		group.add(title);
		group.add(step);
		group.add(options);
		group.add(backbutton);

		Brain.TweenFade(step, 1, true, 1, 0);
		game.input.enabled = true;
		this.timer = game.time.create(true);
		
		var flash = Brain.AddSprite("whitePix", 0, 0, game.width, game.height, 0, 0, false);
		flash.alpha = 1;
		flash.tint = Color.grayHex;
		var flashT = Brain.TweenFade(flash, 0, true, 1, 0);
		group.add(flash);
		flash.inputEnabled = false;
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