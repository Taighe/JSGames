Brain.Preloader = function()
{

};

Brain.Preloader.prototype = 
{
	Start: function() 
	{
		this.game.load.image("whitePix", "../../images/UI/whitePix.png");
		this.game.load.image("full-screen", "../../images/UI/full-screen.png");
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.audio("s_lose", "../../audio/lose_sound.mp3");
		this.game.load.audio("s_tictoc", "../../audio/tictoc.mp3");
		this.game.load.audio("s_gameOver", "../../audio/gameOver.mp3");
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);
		this.game.load.image("center-circle-dashed", "../../images/UI/center-circle-dashed.png");
		this.game.load.image("end-score", "../../images/UI/end-score-Back.png");
		this.game.load.image("time-back", "../../images/UI/time-back.png");
		this.game.load.image("center-circle", "../../images/UI/center-circle.png");
		this.game.load.image("shadow", "../../images/UI/icon-shadow.png");
		this.game.load.image("icon-correct", "../../images/UI/icon-correct.png");
		this.game.load.image("icon-wrong", "../../images/UI/icon-wrong.png");
		this.game.load.image("star", "../../images/UI/star-purple.png");
		this.game.load.image("star-green", "../../images/UI/star-green.png");
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);

		this.game.load.image("icon", "assets/wstiles.png");
		this.game.load.image("circle", "assets/greyCircle.png");
		this.game.load.image("pulse", "assets/pulse.png");
		this.game.load.image("loader-back", "assets/loader-back.png");
		this.game.load.image("loader", "assets/loader.png");
		this.game.load.audio("s_win", "assets/audio/win_sound.mp3");
		this.game.load.start();
	},
	create: function()
	{
		var game = Brain.game
		Brain.GameId = "WordSmith";
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
		var instructions = ["Become an expert at seeking out positive feelings.", "Search for the positive word provided.", "The words can appear in all directions.", "Beware of the time limit for each word.", "Find as many words as you can in 60 seconds."];


		var brainGame = new BrainGame("Word Smith", "icon", instructions, "Science Summary \n \n By tuning in to Positive feelings you can create a cycle of positivity, and this cycle enhances health and wellbeing (1). We have a natural tendency to become locked in to negative feelings, while positive feelings can be fleeting. Noticing positive things around you tune more into your positive feelings, and create the cycle of positivity (2,3). With training, this cycle may become automatic, and enhance your experience of happiness. \n 1.	Fredrickson BL (2000). Cultivating positive emotions to optimize health and well-being. Prevention & Treatment, 31, 1-25. \n 2.	Wadlinger H, Isaacowitz DM. Positive affect broadens visual attention to positive stimuli. Motivation and Emotion. 2006;30:89–101. \n 3.	Xing C, Isaacowitz DM. Aiming at happiness: How motivation affects attention to and memory for emotional information. Motivation and Emotion. 2006;30:243–350");
		brainGame.infoSize = 21
		this.state.start('Title', false, false, brainGame);		
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}

};