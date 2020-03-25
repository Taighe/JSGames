function Word(text1, text2)
{
	this.text1 = text1;
	this.text2 = text2;
}

Brain.Step6 = function(feeling, rating) 
{
	this.isDebug;
	this.gameReady = false;

};

Brain.Step6.prototype = 
{
	init: function(feeling, rating)
	{
		this.negative = feeling
		this.rating = rating
		console.log(feeling);
	},
	create: function() 
	{
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		var game = Brain.game;
		this.title = Brain.AddText("Now rate your feelings again.", 50, 80, Color.lightPurple, 25, 0, 0.5, "bold", 800, "LatoRegular");
		this.option1 = new RatingOption("How Happy do you feel now?", game.width * 0.5, game.height * 0.25);
		this.option1.scale.set(0.8)
		this.option2 = new RatingOption("How " + this.negative.text2 + " do you feel now?", game.width * 0.5, game.height * 0.65);
		this.option2.scale.set(0.8)
		this.go = new GenericButton("NEXT", game.width * 0.5, game.height * 0.9, this.Next, this, 190, 70);
		this.go.centerX = game.width * 0.5
		this.go.centerY = game.height * 0.9
	},
	update: function() 
	{

	},
	Next: function()
	{
		var game = Brain.game;
		this.ratingChange = {positive: this.option1.GetValue(), negative: this.option2.GetValue(), posTime: 0, negTime: 0}
		game.state.start("Step7", true, false, this.negative, this.rating, this.ratingChange);
	}

};