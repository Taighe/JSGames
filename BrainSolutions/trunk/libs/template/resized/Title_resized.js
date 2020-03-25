Brain.Title = function(game) 
{
	this.title = null;
	this.icon = null;
	this.instructions = null;
	this.shadow = null;
	this.index = 0;
	this.info = null;
	this.infoPanel = null;
	this.group = null;
	this.titleSize = null;
	this.instructionsSize = null;
};

Brain.Title.prototype = 
{
	init: function(brainGame, instructionsText)
	{
		this.title = brainGame.title;
		this.icon = brainGame.icon;
		this.instructions = brainGame.instructions;
		
		this.shadow = brainGame.shadow;
		this.size = brainGame.size;
		this.instructionsText = instructionsText;
		this.info = brainGame.info;
		this.instructionsSize = brainGame.instructionsSize;
		this.titleSize = brainGame.titleSize;
		//this.instructionsText.align = "center";
	},

	create: function() 
	{		
		var game = Brain.game;
		var timer = game.time.events.add(Phaser.Timer.SECOND * 1, this.Setup, this);
		this.infoPanel = new InfoPanel(this.info);
		this.group = game.add.group();
	},
	Setup: function()
	{
	    var game = Brain.game;
		this.fullscreen = new Brain.AddButton("", game.width * 0.1, game.height * 0.05, this.infoPanel.Display, this.infoPanel, "full-screen", 50 , 50 , 0.5, 0.5, 1);
		this.exitButton = new Brain.AddButton("", game.width * 0.9 ,game.height * 0.05, this.exit, this, "exit", 35, 35, 0.5, 0.5, 1);
	    game.stage.backgroundColor = Color.white;
	    var topY = game.height / 4;
	    var x = game.width / 2;
	    var bottomY = game.height - (game.height / 10);
	    var spacing = 50;

	    var graphic = Brain.AddSprite(this.icon, x, 0, this.size, this.size, 0.5, 0.5);
	    graphic.centerY = game.height * 0.4;
	    var shadowY = graphic.bottom + 35;
    	var shadow = Brain.AddSprite("shadow", x, shadowY, this.size * 1.3, this.size, 0.5, 0.5);
	    if(this.shadow == false)
	    {
    		shadow.destroy();
    		shadow = Brain.AddSprite("", x, shadowY, this.size, 150, 0.5, 0.5);
	    }

	    var titleText = Brain.AddText( this.title, x, 0, Color.lightPurple, this.titleSize, 0.5, 0.5, "bold", 700, "LatoRegular");
	    titleText.top = shadow.bottom - 50;
	    titleText.wordWrap = false;

	    this.insText = Brain.AddText( "", x, 0, Color.gray, this.instructionsSize, 0.5, 0.5, "normal", 800);
	    this.insText.align = "center";
    	this.insText.top = titleText.bottom;
        var startGame = function()
	    {
	        game.state.start("Game", true, false, this.instructionsText);
	    }

	    var button = new GenericButton( "START", 0, 0, startGame, this, 100, 40);
	    button.centerX = Brain.centerX;
	    button.centerY = game.height * 0.9;
		var timer = game.time.create(false);

    	timer.loop(5 * 1000, this.Instruct, this);
    	this.Instruct();
	    timer.start();
	    this.group.add(shadow);
	    this.group.add(graphic);
	    this.group.add(this.insText);
	    this.group.add(titleText);
     	this.group.add(button);
		this.group.add(this.infoPanel);
		var title = game.add.sprite(0, 0, "title");
		title.width = game.width;
		title.height = game.height;
		title.alpha = 0;
		this.group.add(title);
		
	},
	Instruct()
	{
		var game = Brain.game;
		this.DisplayInstruct(this.instructions[this.index]);
		this.index++;
		this.index = Wrap(this.index, 0, this.instructions.length - 1);
	},
	DisplayInstruct(text)
	{
		var game = Brain.game;
		if(typeof text == 'string')
		{
			this.insText.alpha =0 ;
			this.insText.fontSize = 16 * Brain.scaleRatio;
			this.insText.text = text;
			var fade = Brain.TweenFade(this.insText, 1, true, 1, 0);
			return;
		}
		var timer = game.time.create(true);
		var obj =game.add.existing(text);


		obj.visible = true;
		obj.centerX = Brain.centerX;
		obj.top = this.insText.top;

		var free = function()
		{	
			obj.visible = false;
		};

		timer.add(5* 1000, free, this);
		timer.start();
		obj.alpha = 0;
		var fade = Brain.TweenFade(obj, 1, true, 1, 0);
		game.world.bringToTop(this.group);
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
		if (this.isDebug) {
			this.game.debug.text("Snap pressed: " + this.snapPressed, 50, 50);
			this.game.debug.text("Snaps Correct: " + this.snapCorrect, 50, 100);
			this.game.debug.text("Current Cycle: " + this.currentCycle, 50, 150);
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
	DisplayInfo: function() 
	{

	},
	exitPress: function () 
	{
	    //Brain.popup = new PopUp(this.game);

	    //Brain.popup.create("Are you sure you want to exit the test now?", "", ["YES, EXIT NOW", "RETURN TO TEST"], [this.exit, this.unpause], 3);
	},

	unpause: function (event) {
	    if (event.game.paused == true) 
	    {
	        event.game.paused = false;
	    }
	},

	exit: function () 
	{
	    window.location = this.exitURL;
	},
	info: function () 
	{
	    window.location = this.exitURL;
	},
	getRandomInt(min, max) 
	{
	    return Math.floor(Math.random() * (max - min)) + min;
	},


};