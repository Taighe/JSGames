Brain.Game = function() 
{
	// Default game variabels
	this.isDebug = null;
	this.gameReady = false;
	this.level = 1;
	this.score = 0;
	this.instructionsText = null;
	//
};

Brain.Game.prototype = 
{
	init: function( brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame
		this.instructionsText = new Phaser.Text(game, 0,0, "Match the identical pairs by clicking on the tiles.", {fontSize: 32, fontWeight: "normal"});
		this.instructionsText.wordWrap = true
		this.instructionsText.align ="center"
		this.instructionsText.wordWrapWidth = 500
		this.instructionsText.font = "LatoRegular";
		this.timer = Brain.game.time.create(true);
		this.timer.add(61 * 1000, null, this);
		this.timer.start()
		this.timer.pause()
		this.score = 0
	 	HudManager.Init(this);
	},
	create: function() 
	{
		var game = Brain.game;
		console.log("game created");
		this.title = Brain.AddText("Choose a starting 'Skill Level' to begin", game.width * 0.5, game.height * 0.2, Color.gray, 32, 0.5, 0.5, "normal", 1000, "LatoRegular");
		this.circle = Brain.AddSprite("center-circle", game.width * 0.5, game.height * 0.5, 250, 250, 0.5, 0.5);
		this.levelText = Brain.AddText("LEVEL", this.circle.centerX, this.circle.centerY -55 , Color.gray, 28, 0.5, 0.5, "normal", 1000, "LatoRegular");
		this.levelSprite = Brain.AddText("1", this.circle.centerX, this.circle.centerY + 15, Color.gray, 125, 0.5, 0.5, "bold", 1000, "LatoRegular");	 	
		this.left = new Button("", "arrow_L", Color.lightPurple, Color.grayHex, Color.grayHex, this.Left, this, game.width * 0.35, game.height * 0.8, 50, 100);
		this.right = new Button("", "arrow_R", Color.lightPurple, Color.grayHex, Color.grayHex, this.Right, this, game.width * 0.65, game.height * 0.8, 50, 100);
		this.difficulty = Brain.AddText("Difficulty", game.width * 0.5, game.height * 0.75, Color.lightGray, 25, 0.5, 0.5, "normal", 400, "LatoRegular");
		this.pageNumber = Brain.AddText("", game.width * 0.5, game.height * 0.8, Color.lightPurple, 25, 0.5, 0.5, "bold", 400, "LatoRegular");
	    this.begin = new GenericButton("BEGIN", 0, 0, this.Next, this, 190, 70);
	    this.begin.centerX = game.width * 0.5
	    this.begin.centerY = game.height * 0.9
	 	this.screen = Brain.game.add.group();
	 	this.screen.add(this.title);
	 	this.screen.add(this.circle);
	 	this.screen.add(this.levelText);
	 	this.screen.add(this.levelSprite);
	},
	update: function() 
	{
		// default
		HudManager.Update();
		this.pageNumber.text = this.level + "/7"
		this.levelSprite.text = this.level
	},
	Start: function()
	{
		if(this.gameReady == false)
		{
			this.gameReady = true;
		}
	},
	Left: function()
	{				
		this.level--;
		this.level = Wrap(this.level, 1, 7)
	},
	Right: function()
	{				
		this.level++;
		this.level = Wrap(this.level, 1, 7)
	},
	LevelStart: function()
	{				
		// default
		this.screen.visible = true;
		//this.timer.resume();
	},
	Next: function()
	{
		var game = Brain.game;
		game.state.start("Play", true, false, this.instructionsText, this.level, this.brainGame);
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