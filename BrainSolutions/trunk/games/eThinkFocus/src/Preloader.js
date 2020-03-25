Brain.Preloader = function()
{

};

Brain.Preloader.prototype = 
{
	Start: function() 
	{
		this.game.load.image("full-screen", "../../images/UI/full-screen.png");
		this.game.load.audio("s_lose", "../../audio/lose_sound.mp3");
		this.game.load.audio("s_tictoc", "../../audio/tictoc.mp3");
		this.game.load.audio("s_gameOver", "../../audio/gameOver.mp3");
		this.game.load.image("pulse", "../../images/UI/pulse.png");
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);
		this.game.load.image("center-circle-dashed", "../../images/UI/center-circle-dashed.png");
		this.game.load.image("end-score", "../../images/UI/end-score-Back.png");
		this.game.load.image("time-back", "../../images/UI/time-back.png");
		this.game.load.image("center-circle", "../../images/UI/center-circle.png");
		this.game.load.image("shadow", "../../images/UI/icon-shadow.png");
		this.game.load.image("icon-correct", "../../images/UI/icon-correct.png");
		this.game.load.image("icon-wrong", "../../images/UI/icon-wrong.png");
		this.game.load.image("star", "../../images/UI/star-purple.png");
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.image("whitePix", "../../images/UI/whitePix.png");
		this.game.load.image("basketball", "assets/basketball.png");
		this.game.load.spritesheet("ball", "assets/ball.png", 512, 512, 12);
		this.game.load.image("floor", "assets/floor.png");
		this.game.load.image("wallL", "assets/wall_LSide.png");
		this.game.load.image("wallR", "assets/wall_RSide.png");
		this.game.load.image("arrow_L", "assets/arrow_L.png");
		this.game.load.image("arrow_R", "assets/arrow_R.png");
		this.game.load.start();
	},
	create: function()
	{
		var game = Brain.game
		Brain.GameId = "ThinkFocus";

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
		var instuctions = ["Become an expert at focusing your attention.","Concentration is a key element to your Thinking.", "It allows you to focus on a task without interference from distractions.","Keep the ball off the ground and within the walls", "Use your mouse to balance the ball for 30 seconds."];

		var brainGame = new BrainGame("eThink Focus", "basketball", instuctions, "Science Summary\n\nFocused concentration is made up of your ability sustain your attention and to selectively attend to one thing and not another. This kind of focus allows you to hold significant information ‘online’ and then transfer it to memory [1,2,3]When you lose concentration you can disrupt your clear thinking – for instance, when you try to talk on your cell phone while driving through busy traffic [4].Attention relies on feedback from cortical brain systems, and their connections with structures of the limbic system, such as the hippocampus [2,5]. Distinctive changes are evident in electrical brain activity when we are focusing, selectively attending and holding information ‘online’ [3,6,7].\n\n1.	Gunstad J, et al... (2006). Archives of Clinical Neuropsychology, 21, 645-650.\n2.	Knudsen EI (2007).. Annual Review of Neuroscience, 30, 57–78.\n3.	Clark CR et al.(2004). International Journal of Psychology, 53, 1 - 9.\n4.	Strayer DL, et al.(2003). Journal of Experimental Psychology: Applied, 9, 23-32.\n5.	Mesulam MM. 1999.. Philosophical Transactions of the Royal Society of London: Biological Sciences, 354, 1325–1378\n6.	Tiitinen H, et al. (1993). Nature, 364, 59–78\n7.	Haig AR et al.(2000). NeuroReport, 11, 669 - 675.");
		brainGame.infoSize = 18
		this.state.start('Title', false, false, brainGame);		
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
};