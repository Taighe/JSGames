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
		this.game.load.image("center-circle-dashed", "../../images/UI/center-circle-dashed.png");
		this.game.load.image("pulse", "../../images/UI/pulse.png");
		this.game.load.image("end-score", "../../images/UI/end-score-Back.png");
		this.game.load.image("time-back", "../../images/UI/time-back.png");
		this.game.load.image("center-circle", "../../images/UI/center-circle.png");
		this.game.load.image("shadow", "../../images/UI/icon-shadow.png");
		this.game.load.image("icon-correct", "../../images/UI/icon-correct.png");
		this.game.load.image("icon-wrong", "../../images/UI/icon-wrong.png");
		this.game.load.image("star", "../../images/UI/star-purple.png");
		this.game.load.image("icon", "assets/header.png");
		this.game.load.image("arrow_L", "assets/arrow_L.png");
		this.game.load.image("arrow_R", "assets/arrow_R.png");
		this.game.load.image("swap", "assets/swap.png")
		this.game.load.image("info", "assets/info.png")
		this.game.load.image("grassyNull", "assets/grassyNull.png")
		this.game.load.image("speechBubble", "assets/speechBubble.png")
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);
		this.game.load.atlas("beastBW", "assets/Beast-Black-White.png", "assets/Beast-Black-White.json");
		this.game.load.atlas("beastCAT", "assets/Beast-Catastrophizing.png", "assets/Beast-Catastrophizing.json");
		this.game.load.atlas("beastJTC", "assets/Beast-JumpingToConclusions.png", "assets/Beast-JumpingToConclusions.json");
		this.game.load.atlas("beastOG", "assets/Beast-OverGeneralizing.png", "assets/Beast-OverGeneralizing.json");
		this.game.load.atlas("beastSH", "assets/Beast-Should.png", "assets/Beast-Should.json");

    	this.game.load.start();

	},
	create: function()
	{
		var game = Brain.game;
		Brain.GameId = "ThoughtTamer";
		// Keyboard Input Plugin
		game.add.plugin(Fabrique.Plugins.InputField);
		this.loading = new Brain.AddText("Loading", game.width / 2, game.height / 2, Color.black, 48, 0.5, 0.5);
	    game.load.onLoadStart.add(this.LoadStart, this);
    	game.load.onFileComplete.add(this.FileComplete, this);
    	game.load.onLoadComplete.add(this.LoadComplete, this);
    	this.Start();
	
	},
	update: function()
 	{

	},
	LoadComplete: function()
	{
		var game = Brain.game;
		this.startButton = game.add.button(0, 0, "", this.StartGame, this );
		this.startButton.width = game.width;
		this.startButton.height = game.height;
		this.loading.text = Brain.appLoadMessage	
	},
	LoadStart: function()
	{
		var game = Brain.game;
		this.game.stage.backgroundColor = Color.white;
		this.loading.text = "Loading";

	},
	StartGame: function()
	{
		var game = Brain.game;
		Brain.FullScreen();
        this.startButton.destroy();
		this.loading.destroy();
		var instructions = ["Become an expert at challenging negative thoughts."];
		var brainGame = new BrainGame("Thought Tamer", "icon", instructions, "Science Summary \n \n Thought Challenger uses established techniques of Cognitive Behavior Therapy (C.B.T.) to help users identify negative thinking patterns, and to challenge them by creating more constructive and realistic thoughts in their place.");
		var instructionsText = new Phaser.Text(game, 0,0, "", {fontSize: 26, fontWeight: "normal"});
		instructionsText.font = "LatoRegular";
		instructionsText.addColor(Color.purple, 26);
		instructionsText.addColor(Color.black, 37);
		brainGame.infoSize = 35
		this.state.start('Title', false, false, brainGame, instructionsText);	
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
}