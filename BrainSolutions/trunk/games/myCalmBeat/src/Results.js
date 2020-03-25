Brain.Results = function() 
{
	this.screen = null
	this.pages = null;
};

Brain.Results.prototype = 
{
	init: function( pages, time, progress)
	{
		var game = Brain.game;
		this.ready = false;
		this.pages = pages
		this.time = time
		this.progress = progress
		if(pages["Results"] == null)
		{
			console.log("init")

			this.title = Brain.AddText("WELL DONE!", 0, 0, Color.purple, 64, 0.5, 0.5, "bold", 500, "LatoRegular");
			this.title.centerX = game.width * 0.5
			this.title.centerY = game.height * 0.25
			this.info = Brain.AddText("You are one step closer to have completed a MyCalmBeat training session!", 0, 0, Color.black, 24, 0.5, 0, "normal", 600, "LatoRegular");
			this.info.align = "center"
			this.info.centerX = game.width * 0.5
			this.info.top = this.title.bottom + 50
			this.screen = new Phaser.Group(game);
			this.add = new GenericButton("ADD", 0, 0, this.Add, this, 190, 75);
			this.add.centerX = Brain.centerX;
			this.add.centerY = game.height * 0.9;
			this.cancel = new MenuItem(this, 0, 0, this.Back, this, "CANCEL", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 60, 18)
			this.cancel.x = 15
			this.cancel.y = 15
			this.cancel.once = true;
	   	 	var scoreBoxSprite = Brain.AddSprite("end-score", game.width / 2, game.height * 0.5 + 135, 250, 225, 0.5, 0.5);
		    var trainingTime = Brain.AddText("TRAINING TIME", scoreBoxSprite.centerX, scoreBoxSprite.top + 60, Color.gray, 25, 0.5, 0.5, "", 1000, "LatoRegular");
		    trainingTime.align = "center"
		    this.score = Brain.AddText("1:00", scoreBoxSprite.centerX, scoreBoxSprite.top + 165, Color.gray, 32, 0.5, 0.5, "bold", 1000, "LatoRegular");
		    this.score.align = "center"
			
			this.screen.add(scoreBoxSprite)
			this.screen.add(this.cancel)
			this.screen.add(this.title)
			this.screen.add(this.info)
			this.screen.add(this.add)
			this.screen.add(this.score)
			this.screen.add(trainingTime)
			this.scoreBoxSprite
			this.pages["Results"] = this.screen
		}
		
		this.score.text = FormatTime(time)

	},
	create: function() 
	{
		this.screen.visible = true
	},
	Back: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		game.state.start("Game", false, false, "", this.pages);
	},
	Add: function()
	{
		var game = Brain.game;
	 	var end = this.progress.Data.length - 1
	 	var currentData = this.progress.Data[end]
	 	var score = this.time / 60

	 	if(this.progress.Data.length == 0 || currentData.Date != Brain.Date)
	 	{
	 		currentData = {Date: Brain.Date, Mobile: 0, Website: 0}
	 		if(game.device.desktop)
	 			currentData.Website += score
	 		else
	 			currentData.Mobile += score

	 		this.progress.Data.push(currentData )
	 	}
	 	else
	 	{
	 		if(game.device.desktop)
	 			currentData.Website += score
	 		else
	 			currentData.Mobile += score
	 	}
		
	 	localStorage.setItem("data", JSON.stringify(this.progress));
		this.screen.visible = false
		game.state.start("Game", false, false, "", this.pages);
	},
	update: function()
	{
		var game = Brain.game;
		var dt = game.time.elapsedMS /1000;


	},
	unpause: function (event) 
	{
	    if (event.game.paused == true) 
	    {
	        event.game.paused = false;
	    }
	}
}