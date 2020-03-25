Brain.Practice = function() 
{
	this.initialized = false;
	this.page = 0;
	this.maxPages = 0;
};

Brain.Practice.prototype = 
{
	init: function( affirmation, affirmations, group)
	{
		var game= Brain.game
		this.page = affirmations.indexOf(affirmation)
		this.affirmation = affirmation
		this.myAffirmations = affirmations
		if(this.initialized == false)
		{
			console.log("Practice init");

			this.group = group
			this.screen = new Phaser.Group(game)
			this.title = Brain.AddText("Say your affirmation out loud, then quietly repeat it to yourself.", 0, 0, Color.black, 27, 0, 0, "normal", 600, "LatoRegular");
			this.title.align = "center"
			this.title.centerX = game.width * 0.5
			this.title.centerY = game.height * 0.2
			this.back = new MenuItem(this, 0, 0, this.Back, this, "BACK", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 100, 70, 18)
			this.back.left = 15
			this.back.top = 15
			this.back.once = true
			this.rightButton = new Button("", "arrow_R", Color.white, Color.purpleHex, Color.purpleHex, this.RightArrow, this, game.width * 0.9, game.height *0.5, 60, 60);
			this.leftButton = new Button("", "arrow_L",Color.white, Color.purpleHex, Color.purpleHex, this.LeftArrow, this, game.width * 0.1, game.height *0.5, 60, 60);
		    var button = new GenericButton("EDIT", 0, 0, this.Edit, this, 190, 70);
		    button.centerX = game.width * 0.5;
		    button.centerY = game.height * 0.9;
			this.screen.add(this.title)
			this.screen.add(this.back)
			this.screen.add(this.rightButton)
			this.screen.add(this.leftButton)
			this.screen.add(button)
			this.initialized = true
		}

		var aff = this.myAffirmations[this.page]
		this.DisplayPage(aff, this.group)
	},
	create: function() 
	{
		console.log("Edit Created");
		var game = Brain.game;
		this.screen.visible = true
		this.maxPages = this.myAffirmations.length;

	},
	DisplayPage: function(aff, group)
	{
		var game = Brain.game;
		group.callAll("Visible", null, false)
	    aff.x = 0
    	aff.y = 150
		aff.angle = 0
		aff.scale.set(1)
		aff.visible = true

		aff.SelectMode(false)
	},
	LeftArrow: function()
	{
		var game = Brain.game;
		this.page--
		this.ChangePage()
	},
	RightArrow: function()
	{
		var game = Brain.game;
		this.page++
		this.ChangePage()
	},
	ChangePage()
	{
		this.page = MinMax(this.page, 0, this.maxPages)
		this.DisplayPage(this.myAffirmations[this.page], this.group)
		this.affirmation = this.myAffirmations[this.page]
	},
	update: function() 
	{
		this.rightButton.Enable(true);
		this.leftButton.Enable(true);
		if(this.page <= 0)
		{
			this.leftButton.Enable(false);
		}
		if(this.page >= this.maxPages -1 )
		{
			this.rightButton.Enable(false);
		}
	},
	Back: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		game.state.start("Game", false, false, "");

	},
	Edit: function()
	{
		var game = Brain.game;
		this.screen.visible = false

		game.state.start("Edit", false, false, this.affirmation, this.myAffirmations, this.group);
	},
	Delete: function()
	{
		var game = Brain.game;

	},
	Save: function()
	{
		console.log("save");
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
	KeyPress: function(event) 
	{
	    var game = Brain.game;
        var doc = document.getElementById("hiddenInput");
	},
	DisplayKeyboard: function()
	{

	    var doc = document.getElementById("hiddenInput");
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