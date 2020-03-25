Brain.Preloader = function()
{

};

Brain.Preloader.prototype = 
{
	Start: function() 
	{
		this.game.load.image("whitePix", "../../images/UI/whitePix.png");
		this.game.load.image("full-screen", "../../images/UI/full-screen.png");
		this.game.load.audio("s_lose", "../../audio/lose_sound.mp3");
		this.game.load.audio("s_tictoc", "../../audio/tictoc.mp3");
		this.game.load.audio("s_sling", "assets/audio/Slingshot.mp3");
		this.game.load.audio("s_stretch", "assets/audio/Slingshot_stretch.mp3");
		this.game.load.audio("s_targetHit", "assets/audio/targetHit.mp3");
		this.game.load.audio("s_gameOver", "../../audio/gameOver.mp3");
		this.game.load.audio("s_pop", "assets/audio/pop.mp3");
		this.game.load.image("center-circle-dashed", "../../images/UI/center-circle-dashed.png");
		this.game.load.image("pulse", "../../images/UI/pulse.png");
		this.game.load.image("end-score", "../../images/UI/end-score-Back.png");
		this.game.load.image("time-back", "../../images/UI/time-back.png");
		this.game.load.image("center-circle", "../../images/UI/center-circle.png");
		this.game.load.image("shadow", "../../images/UI/icon-shadow.png");
		this.game.load.image("icon-correct", "../../images/UI/icon-correct.png");
		this.game.load.image("icon-wrong", "../../images/UI/icon-wrong.png");
		this.game.load.image("star", "../../images/UI/star-purple.png");
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.image("dotted-circle", "assets/dotted-circle.png");
		this.game.load.image("icon", "assets/HeaderImage.png");
		this.game.load.image("allcircle", "assets/allcircle.png");
		this.game.load.spritesheet("purplecircle", "assets/purplecircle.png", 23, 23, 2);
		this.game.load.image("target", "assets/target.png");
		this.game.load.image("sling", "assets/smallestDottedCircle.png");
		this.game.load.image("greenBall", "assets/greenBall.png");
		this.game.load.image("greenArrow", "assets/greenArrow.png");

    	this.game.load.start();
	},
	create: function()
	{
		var game = Brain.game;
		Brain.GameId = "Gauntlet";
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
		var instructions = ["Become an expert at\ntarget thinking."];
		var brainGame = new BrainGame("Gauntlet", "icon", instructions, "Science Summary \n \n To perform at your best in complex tasks, you use Executive Function, which brings together key elements of Thinking. Executive function is linked to effective function in real life areas, including quality of life, energy for life and acquiring new information. It relies on flexibility, acquiring rules, estimating time and choosing the right action while suppressing others. These elements of executive function are supported by feedback from cortical brain systems, with a key role for the frontal brain [1,2]. Executive function and associated brain systems has been found to reduce with age [2]. Yet, brain training exercises have been found to benefit executive functions and these benefits translate into real life [3,4]. \n\n 1. Lezak, Muriel Deutsh (1995). Neuropsychological Assessment. 3rd edition. New York: Oxford University Press, 1995. \n 2. Brickman AM, Zimmerman ME, Paul RH et al. (2006). Biological Psychiatry, 60; 444-453 \n 3. Jaeggi SM, Buschkuehl M, Jonides J & Perrig WJ (2008). Improving fluid intelligence with training on working memory. Proceedings of the National Academy of Sciences, 105 (19); 6829-6833. \n 4. Willis SL, et al (2006). Journal of the American Medical Association, 296 [23]; 2805-2814");

		brainGame.shadow = false;
		brainGame.infoSize = 18
		this.state.start('Title', false, false, brainGame);	
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
}