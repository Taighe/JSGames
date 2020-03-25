
Brain.Step5 = function() 
{
	this.isDebug;
	this.gameReady = false;

	this.currentFrame = 0;
	this.maxFrames = 6;
	this.feelingSheet = null;
};

Brain.Step5.prototype = 
{
	init: function(feeling, rating)
	{
		this.negative = feeling
		this.feeling = feeling.text1.toUpperCase();
		this.rating = rating
	},
	create: function() 
	{
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;

		var game = Brain.game;
		var posTime = this.rating.posTime.toFixed(2)
		var negTime = this.rating.negTime.toFixed(2)
		this.title = Brain.AddText("How long did it take to regulate your feelings?", 50, 100, Color.lightPurple, 25, 0, 0.5, "bold", 800, "LatoRegular");
		this.howDo = Brain.AddText("The below results show how much time you have taken to regulate your feelings.", 50, 150, Color.black, 15, 0, 0.5, "bold", 800, "LatoRegular");
		this.resultsText = Brain.AddText("RESULTS", game.width * 0.5, game.height * 0.3, Color.purple, 65, 0.5, 0.5, "bold", 800, "LatoRegular");
		this.resultsText.centerX = game.width * 0.5
		this.resultsText.centerY = game.height * 0.35
		var text = "The time recorded to boost your feelings of Happiness was " + posTime + " seconds. The time recorded for reducing " + this.feeling + " and boosting your feelings of Calmness was " + negTime + " seconds.\n\nYour goal now, is to get faster and more efficient at mastering your feelings";
		this.text = Brain.AddText(text, game.width * 0.5, game.height * 0.6, Color.black, 21, 0.5, 0.5, "bold", 600, "LatoRegular");
		this.go = new GenericButton("NEXT", game.width * 0.5, game.height * 0.9, this.Next, this, 190, 70);
		this.go.centerX = game.width * 0.5
		this.go.centerY = game.height * 0.9
	},
	update: function() 
	{
		var game = Brain.game;
	},
	Next: function()
	{
		var game = Brain.game;
		game.state.start("Step6", true, false, this.negative, this.rating);
	}
};