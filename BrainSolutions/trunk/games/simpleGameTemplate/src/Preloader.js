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
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);

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
		this.loading.text = "Tap To Start"	
	},
	StartGame: function()
	{
		var game = Brain.game;
		Brain.FullScreen();
        this.startButton.destroy();
		this.loading.destroy();
		var instructions = ["Game instructions go here."];
		var instructionsText = new Phaser.Text(game, 0,0, "Game instructions go here.", {fontSize: 32, fontWeight: "normal"});
		instructionsText.font = "LatoRegular";
		instructionsText.addColor(Color.purple, 26);
		instructionsText.addColor(Color.black, 35);

		var brainGame = new BrainGame("eSelf Regulate", "icon", instructions, "Science Summary \n \nLow heart rate variability has been connected to worry and negative feelings, pain, and stresses at work [1-5]. On the other hand, higher heart rate variability enables you to recover more easily from stress, manage your pain [5], and boost your positive feelings and sense of wellbeing [2]. Higher heart rate variability is also beneficial to our ability to focus and concentrate, to think clearly [6].  The best way to increase your heart rate variability (HRV) is to calculate the 1 Best Breathing Rate for you at which Heart Rate Variability is maximal (your ‘Resonant Frequency’) and to train at this rate [3].  Example References \n 1.	Princi T, et al.. (2004). Advances in Electrocardiology, 492-495. \n 2.	Thayer J & Lane RD. (2000). Journal of Affective Disorders, 61-201-216. \n 3.	Gevirtz, R. (2000). Biofeedback, 27 (4), 7-9. \n 4.	Pieper S, et al.. (2007). Psychosomatic Medicine, 69, 901-909. \n 5.	Humphreys, P. & Gevirtz, R. (2000) Journal of Pediatric Gastroenterology and Nuitrition, 31 (1), 47-51. \n 6.	Porges S. (1992). Campbell BA, Hayne H & Richardson R. Lawrence Erlbaum Associates.");
		this.state.start('Title', false, false, brainGame, instructionsText);	
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading %" + progress;
		this.loading.align = "center";
	}
};