Brain.Preloader = function()
{

};

Brain.Preloader.prototype = 
{
	Start: function() 
	{		
		this.game.load.image("whitePix", "../../images/UI/whitePix.png");this.game.load.image("full-screen", "../../images/UI/full-screen.png");
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.audio("s_lose", "../../audio/lose_sound.mp3");
		this.game.load.audio("s_tictoc", "../../audio/tictoc.mp3");
		this.game.load.audio("s_gameOver", "../../audio/gameOver.mp3");
		this.game.load.image("center-circle-dashed", "../../images/UI/center-circle-dashed.png");
		this.game.load.image("end-score", "../../images/UI/end-score-Back.png");
		this.game.load.image("time-back", "../../images/UI/time-back.png");
		this.game.load.image("center-circle", "../../images/UI/center-circle.png");
		this.game.load.image("shadow", "../../images/UI/icon-shadow.png");
		this.game.load.image("icon-correct", "../../images/UI/icon-correct.png");
		this.game.load.image("icon-wrong", "../../images/UI/icon-wrong.png");
		this.game.load.image("star", "../../images/UI/star-purple.png");
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);
		this.game.load.image("pulse", "../../images/UI/pulse.png");
		this.game.load.image("brain", "assets/brain.jpg");
		this.game.load.image("circle", "assets/center-circle.png");
		this.game.load.image("i1", "assets/icon1.jpg");
		this.game.load.image("i2", "assets/icon2.jpg");
		this.game.load.image("i3", "assets/icon3.png");
		this.game.load.image("i4", "assets/icon4.png");
		this.game.load.image("i5", "assets/icon5.jpg");
		this.game.load.image("i6", "assets/icon6.png");
		this.game.load.image("i7", "assets/icon7.jpg");
		this.game.load.image("i8", "assets/icon8.png");
		this.game.load.image("i9", "assets/icon9.jpg");
		this.game.load.image("i10", "assets/icon10.png");
		this.game.load.image("i11", "assets/icon11.png");
		this.game.load.image("i12", "assets/icon12.png");
		this.game.load.audio("s_win", "assets/audio/win_sound.mp3");
		this.game.load.image("arrow_L", "assets/arrow_L.png");
		this.game.load.image("arrow_R", "assets/arrow_R.png");
		this.game.load.start();
	},
	create: function()
	{
		var game = Brain.game
		Brain.GameId = "ThinkMemory";
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
		var instructions = ["Become an expert at\nmemory recall.","Match the identical pairs by clicking on the tiles."];


		var brainGame = new BrainGame("eThink Memory", "brain", instructions, "Science summary \n \nMemory is your capacity to register, store and then later recall information [1].  Because of the way our brain is organized to minimize danger-maximize reward, we tend to register, store and recall information that has a personal significance to your - for instance, information that is associated with a strong feeling is remembered better than information that is considered not relevant to us. Indeed, better memory has been associated with better emotion processing [2,3].  We are also better at recalling emotionally significant information as we age, than we are at recalling general facts [4]. This improvement goes hand in hand with better emotional stability and regulation [5].  Short term memory (stm) store lasts from a couple of seconds to about 20 seconds [1]. On average, the brain can process about 7+2 chunks of information.  \n\n1.	Tulving e and donaldson w. (Eds.), (1972). New york: academic press. \n2.	Mathersul d et al. (2009). Journal of clinical and experimental neuropsychology (in press) \n3.	Phelps ea. (2004). Neurobiology, 14, 198-202. \n4.	Carstensen ll, lockenhoff ce, (2000). Annals of the new york academy of sciences, 1000, 152-179. \n5.	Williams lm et al.(2006). Journal of neuroscience, 26, 6422 - 6430.");
		brainGame.infoSize = 18
		this.state.start('Title', false, false, brainGame);		
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}

};