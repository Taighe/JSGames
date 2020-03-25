Brain.Edit = function() 
{
	this.initialized = false;
	this.data = null
};

Brain.Edit.prototype = 
{
	init: function( affirmation, affirmations, group)
	{
		var game= Brain.game
		this.affirmation = affirmation
		this.myAffirmations = affirmations
		this.group = group

		if(this.initialized == false)
		{
			console.log("Edit init");
			
			this.screen = new Phaser.Group(game)
			this.title = Brain.AddText("Update your affirmation.", 0, 0, Color.black, 27, 0, 0, "normal", 600, "LatoRegular");
			this.title.align = "center"
			this.title.centerX = game.width * 0.5
			this.title.centerY = game.height * 0.1
			this.back = new MenuItem(this, 0, 0, this.Back, this, "BACK", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 100, 70, 18)
			this.back.left = 15
			this.back.top = 15
			this.back.once = true
			this.delete = Brain.AddText("x", 0, 0, Color.gray, 45, 0.5, 0.5, "normal", 1000, "LatoRegular")
			this.delete.events.onInputDown.add(this.Delete, this)
			this.screen.inputEnableChildren = true
		    this.button = new GenericButton("CONFIRM", 0, 0, this.Confirm, this, 190, 70);
		    this.button.centerX = game.width * 0.5;
		    this.button.centerY = game.height * 0.9;
			this.screen.add(this.button)
			this.screen.add(this.title)
			this.screen.add(this.back)
			this.screen.add(this.delete)
			
			this.initialized = true
		}
		
		this.DisplayPage(this.affirmation)
		this.data = this.affirmation.word.text
	},
	create: function() 
	{
		console.log("Edit Created");
		var game = Brain.game;
		this.screen.visible = true;
        var doc = document.getElementById("hiddenInput");
		doc.value= ""
	},
	DisplayPage: function(aff)
	{
		var game = Brain.game;
		this.group.callAll("Visible", null, false)
		aff.visible = true
		aff.centerY = 0
		this.delete.x = aff.worldTransform.tx + aff.width * 0.43
		this.delete.y = aff.y + 200
		this.delete.z = 1
		aff.SelectMode(false)
		aff.SetEditMode(this.data)

	},
	update: function() 
	{

	},
	Back: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		this.affirmation.word.text = this.data
		this.affirmation.SelectMode(false)
		game.state.start("Practice", false, false, this.affirmation, this.myAffirmations, this.group);

	},
	Confirm: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		this.affirmation.SelectMode(false)
		game.state.start("Practice", false, false, this.affirmation, this.myAffirmations, this.group);
	},
	Delete: function()
	{
		// Deleting affirmation
		var game = Brain.game;
		this.screen.visible = false
		var index = this.myAffirmations.indexOf(this.affirmation) // Get the index of the aff to remove it from the element ref
		delete this.myAffirmations[index]
		this.myAffirmations.splice(index, 1) // remove undefined hole in the array
		this.affirmation.destroy() // destroy phaser object in game world

		game.state.start("Game", false, false, "");
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