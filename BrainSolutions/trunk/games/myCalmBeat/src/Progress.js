Brain.Progress = function() 
{
	this.screen = null
	this.pages = null;
	this.selected = null;
	this.index = 0
};

Brain.Progress.prototype = 
{
	init: function(pages, progress)
	{
		var game = Brain.game;
		this.ready = false;
		this.pages = pages;
		this.index = 0
		this.progress = progress
		console.log(this.progress)
		this.graph = game.add.group()

		if(pages["Progress"] == null)
		{
			console.log("init")
			this.title = Brain.AddText("Recommendation: 10min/day, 3 days/week", 0, 0, Color.black, 25, 0.5, 0.5, "normal", 500, "LatoRegular");
			this.title.centerX = game.width * 0.5
			this.title.centerY = game.height * 0.15
			this.back = new MenuItem(this, 0, 0, this.Back, this, "BACK TO TRAINING", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 60, 18)
			this.back.x = 15
			this.back.y = 15
			this.back.once = true;

			this.website = Brain.AddText("WEBSITE", 0, 0, Color.purple, 20, 0.5, 0.5, "normal", 500, "LatoRegular");
			this.website.centerX = game.width * 0.35
			this.website.centerY = game.height * 0.22
			this.mobile = Brain.AddText("MOBILE", 0, 0, Color.lightPurple, 20, 0.5, 0.5, "normal", 500, "LatoRegular");
			this.mobile.centerX = game.width * 0.65
			this.mobile.centerY = game.height * 0.22
			var graphic = new Phaser.Graphics(game, 0, 0);
			graphic.beginFill(Color.purpleHex);
			graphic.drawCircle(this.website.left - 21, this.website.centerY, 20);
			graphic.beginFill(Color.lightPurpleHex);
			graphic.drawCircle(this.mobile.left - 21, this.mobile.centerY, 20);
			graphic.moveTo(game.width * 0.1, game.height * 0.8)
			graphic.lineStyle(2, Color.blackHex,1);
			graphic.lineTo(game.width * 0.9, game.height * 0.8);

			this.decrease = new Brain.AddButton("", game.width * 0.2, game.height * 0.93, this.PrevPage, this,"arrow_L", 64, 64, 0.5, 0.5, 1);
			this.increase = new Brain.AddButton("", game.width * 0.8, game.height * 0.93, this.NextPage, this, "arrow_R", 64, 64, 0.5, 0.5, 1);

			this.screen = new Phaser.Group(game);
			this.screen.add(this.title)
			this.screen.add(this.back)
			this.screen.add(this.website)
			this.screen.add(this.mobile)
			this.screen.add(this.increase)
			this.screen.add(this.decrease)
			this.screen.add(graphic)

			this.pages["Progress"] = this.screen
		}

		this.maxPages = parseInt(this.progress.Data.length / 6)
		if(this.maxPages < 1)
		{
			this.decrease.visible = false
			this.increase.visible = false
		}
		this.DisplayGraph()
	},
	DisplayGraph: function()
	{
		var game = Brain.game
		this.graph.removeAll(true)
		var posXi = 0
		var spacing = 90
		var columnWidth = 50
		var element = this.index * 6
		var array = this.progress.Data.slice(element, element+ 6)
		console.log(array)
		var top = game.height * 0.8
		var maxHeight = 350
		for(i=0; i < array.length; i++)
		{
			top = game.height * 0.8
			if(array[i].Website > 0 )
			{
				var column = new Phaser.Graphics(game, 0, 0);
				var color = Color.purpleHex

				column.beginFill(color);
				column.drawRect(posXi * spacing, 0, columnWidth, array[i].Website * 40)

				column.bottom = game.height * 0.8

				var time = Brain.AddText(array[i].Website, posXi * spacing + 25, column.bottom - 15, Color.white, 24, 0.5, 0.5, "bold", 500, "LatoRegular")
				top = column.top
				this.graph.add(column)
				this.graph.add(time)
			}
			if(array[i].Mobile > 0 )
			{
				var column2 = new Phaser.Graphics(game, 0, 0);
				var color2 = Color.lightPurpleHex

				column2.beginFill(color2);
				column2.drawRect(posXi * spacing, 0, columnWidth, array[i].Mobile * 40)

				column2.bottom = top

				var time2 = Brain.AddText(array[i].Mobile, posXi * spacing + 25, column2.bottom - 15, Color.white, 24, 0.5, 0.5, "bold", 500, "LatoRegular")

				this.graph.add(column2)
				this.graph.add(time2)

			}

			var date = Brain.AddText(array[i].Date, posXi * spacing + 25, game.height * 0.85, Color.lightGray, 14, 0.5, 0.5, "bold", 500, "LatoRegular")
			this.graph.add(date)
			posXi++
		}

		this.graph.centerX = game.width * 0.5
	},
	NextPage: function() 
	{
		this.index++
		this.index = MinMax(this.index, 0, this.maxPages)
		this.DisplayGraph()

	},
	PrevPage: function() 
	{
		this.index--
		this.index = MinMax(this.index, 0, this.maxPages)
		this.DisplayGraph()

	},
	create: function() 
	{
		this.screen.visible = true
	},
	Back: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		this.graph.visible = false
		game.state.start("Game", false, false, "", this.pages);
	},
	update: function()
	{
		var game = Brain.game;
		var dt = game.time.elapsedMS /1000;
		if(this.index <= 0)
			this.decrease.visible = false
		else
			this.decrease.visible = true

		if(this.index >= this.maxPages)
			this.increase.visible = false
		else
			this.increase.visible = true	

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
	}
}