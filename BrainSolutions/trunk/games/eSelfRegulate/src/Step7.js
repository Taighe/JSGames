

Brain.Step7 = function() 
{
	this.isDebug;
	this.gameReady = false;

	this.currentFrame = 0;
	this.maxFrames = 6;
	this.feelingSheet = null;
};

Brain.Step7.prototype = 
{
	init: function(feeling, rating1, rating2)
	{
		this.feeling = feeling
		this.rating = rating1
		this.ratingChange = rating2
	},
	create: function() 
	{
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;

		var game = Brain.game;

		var posTime = this.rating.posTime.toFixed(2)
		var negTime = this.rating.negTime.toFixed(2)
		this.resultsText = Brain.AddText("WELL DONE!", game.width * 0.5, game.height * 0.2, Color.purple, 64, 0.5, 0.5, "bold", 1000);
		this.resultsText.centerX = game.width * 0.5
		this.resultsText.centerY = game.height * 0.25

		var graphics = new Phaser.Graphics(game, 0, 0);
		graphics.lineStyle(2, Color.lightGrayHex, 1);
		graphics.lineTo(game.width, 0 )
		var lineSprite = graphics.generateTexture()
		//var line1 = game.add.sprite( 0, game.height * 0.6, lineSprite)
		//var line2 = game.add.sprite( 0, game.height * 0.8, lineSprite)
		var text2 ="You are one step closer to self regulating your feelings."
		this.text = Brain.AddText(text2, game.width * 0.5, this.resultsText.bottom + 25, Color.black, 24, 0.5, 0, "normal", 600, "LatoRegular");
		this.text.align = "center"

		var x = game.width * 0.48
		var spacing = 10
		var padding = 75
		var size = 21
	    var scoreBoxSprite = Brain.AddSprite("end-score", game.width / 2, game.height * 0.6, 275, 275, 0.5, 0.5);
		this.happyT = Brain.AddText("Happy:", x, game.height * 0.53, Color.lightGray, size, 1, 0.5, "normal", 600, "LatoRegular");
		this.happyT.align = "right"
		this.happyV = Brain.AddText("20% increase", this.happyT.right + spacing, this.happyT.centerY, Color.purple, size, 0, 0.5, "normal", 600, "LatoRegular");
		this.happyV.align = "left"
		this.boostT = Brain.AddText("Boost time:", x, this.happyT.bottom + spacing, Color.lightGray, size, 1, 0.5, "normal", 600, "LatoRegular");
		this.boostT.align = "right"
		this.boostV = Brain.AddText("10 seconds", this.boostT.right + spacing, this.boostT.centerY, Color.purple, size, 0, 0.5, "normal", 600, "LatoRegular");
		this.boostV.align = "left"

		this.feelT = Brain.AddText(this.feeling.text1 + ":", x, this.boostT.bottom + padding, Color.lightGray, size, 1, 0.5, "normal", 600, "LatoRegular");
		this.feelT.align = "right"
		this.feelV = Brain.AddText("20% decrease", this.feelT.right + spacing, this.feelT.centerY, Color.purple, size, 0, 0.5, "normal", 600, "LatoRegular");
		this.feelV.align = "left"
		this.calmT = Brain.AddText("Calm time:", x, this.feelT.bottom + spacing, Color.lightGray, size, 1, 0.5, "normal", 600, "LatoRegular");
		this.calmT.align = "right"
		this.calmV = Brain.AddText("10 seconds", this.calmT.right + spacing, this.calmT.centerY, Color.purple, size, 0, 0.5, "normal", 600, "LatoRegular");
		this.calmV.align = "left"

		this.go = new GenericButton("REPLAY", game.width * 0.5, game.height * 0.9, this.Next, this, 190, 70);
		this.go.centerX = game.width * 0.5
		this.go.centerY = game.height * 0.9
		this.CalculateScore()
	},
	update: function() 
	{
		var game = Brain.game;

	},
	Next: function()
	{
		var game = Brain.game;
		game.state.start("Title", true, false, Brain.brainGame);
	},
	CalculateScore: function()
	{
		var diffP = ((this.ratingChange.positive - this.rating.positive) / 10) * 100
		var diffN = ((this.ratingChange.negative - this.rating.negative) / 10) * 100
		this.rating.posTime = this.rating.posTime.toFixed(2)
		this.rating.negTime = this.rating.negTime.toFixed(2)
		var tP = "UP "
		if(diffP < 0)
			tP = "DOWN "
		else if(diffP ==0)
			tP = ""

		var tN = "UP "
		if(diffN < 0)
			tN = "DOWN "
		else if(diffN ==0)
			tN = ""

		diffP = Math.abs(diffP)
		diffN = Math.abs(diffN)
		this.happyV.text = tP + diffP + "%" 
		this.boostV.text = this.rating.posTime + " secs"

		this.feelV.text = tN + diffN + "%"
		this.calmV.text = this.rating.negTime + " secs"

	}
};