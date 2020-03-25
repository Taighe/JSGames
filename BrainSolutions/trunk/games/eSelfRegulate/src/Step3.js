
Brain.Step3 = function() 
{
	this.isDebug;
	this.gameReady = false;

	this.currentFrame = 0;
	this.maxFrames = 6;
	this.feelingSheet = null;

};

Brain.Step3.prototype = 
{
	init: function(feeling, rating)
	{
		this.negative = feeling
		this.feeling = feeling
		
		this.feelingSheet = feeling.text1;
		this.rating = rating
	},
	create: function() 
	{
		this.s_lose = Brain.game.add.audio("s_lose");
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;

		var game = Brain.game;
		var fontSize = 25
		if(game.device.iOS)
		{
			fontSize = 20
		}
		this.title = Brain.AddText("Choose the picture that makes you most " + this.feeling.text2.toUpperCase() + ".", Brain.centerX, game.height * 0.1, Color.black, fontSize, 0.5, 0.5, "bold", 700, "LatoRegular");

		this.pic = new Phaser.Sprite(game, 0, 0, this.feelingSheet);
		this.pic.scale.set(1.6);
		this.pic.centerX = Brain.centerX;
		this.pic.centerY = Brain.centerY;
		this.pic.inputEnabled = true;
		this.pic.events.onInputDown.add(this.Next, this);
		game.add.existing(this.pic);
		var mask = new Phaser.Graphics(game, 0, 0);
		mask.beginFill(Color.blackHex)
		mask.drawRoundedRect(0, 0, 450, 500, 25);
		game.add.existing(mask)
		mask.x = game.width * 0.5 - 450 * 0.5
		mask.y = game.height * 0.5 - 500 * 0.5
		this.pic.mask = mask
		this.left = new Button("", "arrow_L", Color.lightPurple, Color.grayHex, Color.grayHex, this.Left, this, game.width * 0.35, game.height * 0.9, 50, 100);
		this.right = new Button("", "arrow_R", Color.lightPurple, Color.grayHex, Color.grayHex, this.Right, this, game.width * 0.65, game.height * 0.9, 50, 100);
		this.pageNumber = Brain.AddText("", Brain.centerX, game.height * 0.9, Color.lightGray, 25, 0.5, 0.5, "bold", 400, "LatoRegular");
		this.currentFrame = 0;
	},
	Left: function()
	{
		this.currentFrame--;
		this.currentFrame = Wrap(this.currentFrame, 0, this.maxFrames - 1)
		this.pic.frame = this.currentFrame;
	},
	Right: function()
	{
		this.currentFrame++;
		this.currentFrame = Wrap(this.currentFrame, 0, this.maxFrames - 1)
		console.log(this.currentFrame)
		this.pic.frame = this.currentFrame;
	},
	update: function() 
	{
		this.pageNumber.text = 1+this.currentFrame + "/" + this.maxFrames;
	},
	Next: function()
	{
		var game = Brain.game;
		game.state.start("Step4", true, false, this.feeling, this.feelingSheet, this.currentFrame, this.negative, this.rating);
	}
};