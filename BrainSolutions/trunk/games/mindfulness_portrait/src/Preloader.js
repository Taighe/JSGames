Brain.Preloader = function()
{

};

Brain.Preloader.prototype = 
{
	Start: function() 
	{
		this.game.load.image("full-screen", "../../images/UI/full-screen.png");
		this.game.load.audio("bg_music", "assets/audio/BG_Music.mp3");
		this.game.load.image("bg1", "assets/bg-0001.png");
		this.game.load.image("bg2", "assets/bg-0002.png");
		this.game.load.image("bg3", "assets/bg-0003.png");
		this.game.load.image("bg4", "assets/bg-0004.png");
		this.game.load.image("bg5", "assets/bg-0005.png");
		this.game.load.image("bg6", "assets/bg-0006.png");
		this.game.load.image("bg7", "assets/bg-0007.png");
		this.game.load.image("bg8", "assets/bg-0008.png");
		this.game.load.image("whitePix", "assets/whitePix.png");
		this.game.load.image("alert", "assets/alert.png");
		this.game.load.spritesheet("button", "assets/button.png", 220, 50, 2);
		this.game.load.spritesheet("play", "assets/play.png", 119, 119, 4);
		this.game.load.spritesheet("playButton", "assets/playButton.png", 119, 119, 2);
		this.game.load.spritesheet("5min", "assets/5min.png", 166, 166, 2);
		this.game.load.spritesheet("10min", "assets/10min.png", 166, 166, 2);
		this.game.load.spritesheet("20min", "assets/20min.png", 166, 166, 2);
		this.game.load.spritesheet("stop", "assets/stop.png", 119, 119, 2);
		this.game.load.image("lungs", "assets/lungs.png");
		this.game.load.image("lungs-back", "assets/lungs-back.png");
		this.game.load.image("lungs-mask", "assets/lungs-mask.png");
		this.game.load.spritesheet("back", "assets/backButton.png", 37, 45, 2);
		this.game.load.image("spinner", "../../images/UI/spinner.png");
		this.game.load.start();
	},
	create: function()
	{
		var game = Brain.game
		if(game.device.android == true)
		{
			this.scale.minWidth = game.width / 10;
			this.scale.maxWidth = game.width;
			this.scale.minHeight = game.height / 10;
			this.scale.maxHeight = game.height *0.6;
		}
		else if(game.device.iPhone == true)
		{
			this.scale.minWidth = game.width / 10;
			this.scale.maxWidth = game.width * 0.7;
			this.scale.minHeight = game.height / 10;
			this.scale.maxHeight = game.height *0.45;
		}
		else if(game.device.iPhone4 == true)
		{
			this.scale.minWidth = game.width / 10;
			this.scale.maxWidth = game.width * 0.7;
			this.scale.minHeight = game.height / 10;
			this.scale.maxHeight = game.height *0.42;
		}
		this.loading = new Brain.AddText("Loading", game.width / 2, game.height / 2, Color.black, 48, 0.5, 0.5);
	    game.load.onLoadStart.add(this.LoadStart, this);
    	game.load.onFileComplete.add(this.FileComplete, this);
    	game.load.onLoadComplete.add(this.LoadComplete, this);

    	this.Start();
	},
	LoadStart: function()
	{
		var game = Brain.game;
		this.game.stage.backgroundColor = Color.white;
		this.loading.text = "Loading";

	},
	LoadComplete: function()
	{
		var game = Brain.game;
		this.startButton = game.add.button(0, 0, "", this.StartGame, this );
		this.startButton.width = game.width;
		this.startButton.height = game.height;
		this.loading.text = Brain.appLoadMessage	
	},
	StartGame: function()
	{
		var game = Brain.game;
		Brain.FullScreen();
        this.startButton.destroy();
		this.loading.destroy();
		console.log("preload");

		this.state.start("Title");
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
};