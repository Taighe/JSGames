Brain.PickAThought = function(game) 
{
	this.selected = null
};

Brain.PickAThought.prototype = 
{
	init: function(exercise)
	{
		var game = Brain.game;
		if(exercise.pages["PickAThought"] == null)
		{
			console.log("pick a thought init");
			var spacing = 15;
			this.title = Brain.AddText("When do you experience the most negative feelings?", game.width * 0.5, game.height * 0.08, Color.white, 17, 0.5, 0.5, "normal", 500, "LatoRegular");
			this.backB = new MenuItem(this, game.width * 0.1, game.height * 0.08, this.Back, this, "BACK", Color.whiteHex, Color.lightGrayHex, Color.gray, Color.lightGray, 100, 50, 15);
			this.backB.once = true		
			this.menu1B = new MenuItem(this, game.width * 0.5, game.height * 0.3, this.Start, this, "CHANGING OR CREATING A HABIT", Color.whiteHex, Color.lightGrayHex, Color.gray, Color.lightGray, 300, 50, 15);
			this.menu1B.once = true
			this.menu2B = new MenuItem(this, game.width * 0.5, game.height * 0.4, this.Start, this, "THINKING OF THE PAST OR FUTURE", Color.whiteHex, Color.lightGrayHex, Color.gray, Color.lightGray, 300, 50, 15);
			this.menu2B.once = true
			this.menu3B = new MenuItem(this, game.width * 0.5, game.height * 0.5, this.Start, this, "WORK RELATED", Color.whiteHex, Color.lightGrayHex, Color.gray, Color.lightGray, 300, 50, 15);
			this.menu3B.once = true
			this.menu4B = new MenuItem(this, game.width * 0.5, game.height * 0.6, this.Start, this, "HEALTH RELATED", Color.whiteHex, Color.lightGrayHex, Color.gray, Color.lightGray, 300, 50, 15);
			this.menu4B.once = true
			this.menu5B = new MenuItem(this, game.width * 0.5, game.height * 0.7, this.Start, this, "RELATIONSHIP RELATED", Color.whiteHex, Color.lightGrayHex, Color.gray, Color.lightGray, 300, 50, 15);
			this.menu5B.once = true
			exercise.pages["PickAThought"] = this;
		}
		this.Visible(true)
		this.selected = null
	},
	create: function() 
	{
		this.game.stage.backgroundColor = Color.gray;
	},
	Start: function()
	{
		var game = Brain.game;
		this.Visible(false)
		game.state.start("Game", false, false, true);
	},
	Visible: function(visible)
	{
		this.title.visible = visible
		this.backB.visible = visible
		this.menu1B.visible = visible
		this.menu2B.visible = visible
		this.menu3B.visible = visible
		this.menu4B.visible = visible
		this.menu5B.visible = visible
	},
	Back: function()
	{
		var game = Brain.game;
		this.Visible(false)
		game.state.start("Game", false, false);
	}

};