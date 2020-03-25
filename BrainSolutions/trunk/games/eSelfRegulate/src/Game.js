function Word(text1, text2)
{
	this.text1 = text1;
	this.text2 = text2;
}

Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.timer;
	this.miscTimer;
	this.duration = 61; // Duration of exercise in seconds
	this.level = 1;
	this.clockwise = true;
	this.count;
	this.correct = false;
	this.negatives = [new Word("Anger", "Angry"), new Word("Anxiety","Anxious"), new Word("Sad", "Sad")]
};

Brain.Game.prototype = 
{
	init: function(brainGame)
	{
		this.negative = this.negatives[GetRandomInt(0, this.negatives.length)]
	},
	create: function() 
	{
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		var game = Brain.game;
		this.option1 = new RatingOption("How Happy have you been today?", game.width * 0.5, game.height * 0.25);
		this.option1.scale.set(0.8)
		this.option2 = new RatingOption("How " + this.negative.text2 + " have you been today?", game.width * 0.5, game.height * 0.65);
		this.option2.scale.set(0.8)
		this.go = new GenericButton("NEXT", game.width * 0.5, game.height * 0.9, this.Next, this, 190, 70);
		this.go.x = game.width * 0.5
		this.go.y = game.height * 0.9
	},
	update: function() 
	{

	},
	Next: function()
	{
		var game = Brain.game;
		console.log(this.option1.GetValue() + " " +this.option2.GetValue() )
		this.rating = {positive: this.option1.GetValue(), negative: this.option2.GetValue(), posTime: 0, negTime: 0}
		game.state.start("Step3", true, false, this.negative, this.rating);
	}

};