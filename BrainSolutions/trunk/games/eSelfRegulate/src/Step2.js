
Brain.Step2 = function() 
{
	this.isDebug;
	this.gameReady = false;

	this.currentFrame = 0;
	this.maxFrames = 6;
	this.feelingSheet = null;
};

Brain.Step2.prototype = 
{
	init: function(feeling, sprite, frame, rating)
	{
		this.feeling = feeling
		this.rating = rating
		this.feelingSheet = sprite;
		this.currentFrame = frame;
		this.timer = 0;
		this.index = 0
		this.started = false
	},
	create: function() 
	{
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		this.index= 0
		var game = Brain.game;
		this.wordArray = ["Remember a past event that made you feel this HAPPY.", "Can you notice your breathing or heart rate change?", "Now try to BOOST the feeling to be even HAPPIER.", "Click the button below when you feel a HAPPY boost.", ]
		var fontSize = 25
		if(game.device.iOS)
		{
			fontSize = 20
		}
		this.title = Brain.AddText(this.wordArray[0],Brain.centerX, game.height * 0.11, Color.black, fontSize, 0.5, 0.5, "bold", 700, "LatoRegular");
		this.pic = new Phaser.Sprite(game, 0, 0, this.feelingSheet);
		this.pic.scale.set(1.6);
		this.pic.centerX = Brain.centerX;
		this.pic.centerY = Brain.centerY;
		this.pic.inputEnabled = true;
		this.pic.frame = this.currentFrame;

		game.add.existing(this.pic);
		var mask = new Phaser.Graphics(game, 0, 0);
		mask.beginFill(Color.blackHex)
		mask.drawRoundedRect(0, 0, 450, 500, 25);
		game.add.existing(mask)
		mask.x = game.width * 0.5 - 450 * 0.5
		mask.y = game.height * 0.5 - 500 * 0.5
		this.pic.mask = mask
		this.timerText = Brain.AddText(0, game.width * 0.5, game.height * 0.9, Color.lightGray, 25, 0.5, 0.5, "bold", 400, "LatoRegular");
		this.go = new GenericButton("I FEEL HAPPIER", game.width * 0.5, game.height * 0.8, this.Next, this, 300, 70);
		this.go.centerX = game.width * 0.5
		this.go.centerY = game.height * 0.8

		this.continue = new GenericButton("CONTINUE", game.width * 0.5, game.height * 0.8, this.NextWord, this, 300, 70);
		this.continue.centerX = game.width * 0.5
		this.continue.centerY = game.height * 0.8
	},
	update: function() 
	{
		var game = Brain.game;
		var dt = game.time.elapsedMS / 1000;
		if(this.started)
		{
			this.timer += 1 * dt;
		}
		var time = FormatTime(this.timer)
		this.timerText.text = time;

	},
	NextWord: function()
	{
		var game = Brain.game;
		if(this.index >= this.wordArray.length - 2)
		{
			this.started = true
			this.continue.visible = false
			this.index++
			this.title.text = this.wordArray[this.index]
			return
		}

		this.index++
		this.title.text = this.wordArray[this.index]

	},
	Next: function()
	{
		var game = Brain.game;
		this.rating.posTime = this.timer;
		game.state.start("Step6", true, false, this.feeling, this.rating);
	}
};