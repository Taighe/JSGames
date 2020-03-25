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
		this.game.load.image("center-circle-dashed", "../../images/UI/center-circle-dashed.png");
		this.game.load.image("pulse", "../../images/UI/pulse.png");
		this.game.load.image("whitePix", "../../images/UI/whitePix.png");
		this.game.load.image("end-score", "../../images/UI/end-score-Back.png");
		this.game.load.image("time-back", "../../images/UI/time-back.png");
		this.game.load.image("center-circle", "../../images/UI/center-circle.png");
		this.game.load.image("shadow", "../../images/UI/icon-shadow.png");
		this.game.load.image("icon-correct", "../../images/UI/icon-correct.png");
		this.game.load.image("icon-wrong", "../../images/UI/icon-wrong.png");
		this.game.load.image("star", "../../images/UI/star-purple.png");
		this.game.load.image("icon", "assets/icon.png");
		this.game.load.image("arrow_L", "assets/arrow_L.png");
		this.game.load.image("arrow_R", "assets/arrow_R.png");
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);
		this.game.load.spritesheet("happy_child", "assets/happy_child.png", 480, 320, 6);
		this.game.load.spritesheet("happy_outdoor", "assets/happy_outdoor.png", 480, 320, 6);
		this.game.load.spritesheet("happy_family", "assets/happy_family.png", 480, 320, 6);
		this.game.load.spritesheet("happy_win", "assets/happy_win.png", 480, 320, 6);
		this.game.load.spritesheet("Anxiety", "assets/anxiety.png", 480, 320, 6);
		this.game.load.spritesheet("Sad", "assets/sad.png", 480, 320, 6);
		this.game.load.spritesheet("Anger", "assets/anger.png", 480, 320, 6);

    	this.game.load.start();

	},
	create: function()
	{
		var game = Brain.game;

		this.loading = new Brain.AddText("Loading", game.width / 2, game.height / 2, Color.black, 48, 0.5, 0.5);
	    game.load.onLoadStart.add(this.LoadStart, this);
    	game.load.onFileComplete.add(this.FileComplete, this);
    	game.load.onLoadComplete.add(this.LoadComplete, this);
    	this.Start();
	
	},
	update: function()
 	{

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
		var instructions = ["Become an expert at self regulating your feelings."];

		var brainGame = new BrainGame("eSelf Regulate", "icon", instructions, "Science Summary \n \n Self Regulation is reflected in aspects of self control, positivity versus negativity bias (or tendency to focus on positive versus negative events), emotional resilience, confidence (2,3), self-efficacy and social skills. It is important for emotional intelligence, and the capacity to regulate your interactions with others [1-3]. Brain chemicals such as neuropeptides have a role in Self Regulation. For example, oxytocin and vasopressin are involved in social behaviors, including maternal behavior and pair bonding. Interactions between brain and body allow you to increase your positive Feelings, Thinking and actions, and inhibit unwanted actions, in relation to changing environmental demands [1] – the essence of Self Regulation. \n 1.	Williams LM et al.. (2008). Journal of Integrative Neuroscience, 7, 367-404. \n2.	Gross JJ, John OP, (2003). Journal of Personality and Social Psychology, 85, 348–362 3.	Rowe DL, et al. (2007). Journal of Integrative Neuroscience, 6, 35–74.");
		brainGame.infoSize = 21
		this.state.start('Title', false, false, brainGame);	
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
};