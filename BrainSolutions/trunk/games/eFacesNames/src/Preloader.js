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
		this.game.load.audio("s_win", "../../audio/win_sound.mp3");
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.image("whitePix", "../../images/UI/whitePix.png");
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
		this.game.load.spritesheet("option", "assets/option.png", 38, 38, 2);
		this.game.load.spritesheet("male", "assets/male.png", 384, 480, 18);
		this.game.load.spritesheet("female", "assets/female.png", 384, 480, 19);
		this.game.load.image("icon", "assets/HeaderImage.png");
		this.game.load.image("greyBox", "assets/greybox.png");

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
		var instructions = ["Become an expert at remembering names"];
		var brainGame = new BrainGame("Faces & Names", "icon", instructions, "Science Summary\n\nSocial skill are a central part of good Self Regulation [1,2]. For effective social skills, we often need to remember the link between people’s faces, names and occupations. To do this, we form associations between our Emotion, Feeling and Thinking processes.Sometimes we listen out for our own name, rather than make the association between another person’s name and their face. Our brain systems’ tend to pick up facial cues automatically [1]. However, they rely on practice and memory associations to identify a person and make the link to their name and occupation [3,4].Practicing strategies for linking faces, names and occupations is a way to optimize these brain functions, and improve social skills. \n\n1.	Williams LM et al. (2008). The INTEGRATE Model of Emotion, Thinking and Self Regulation: An application to the ‘paradox of aging’. Journal of Integrative Neuroscience, 7, 367-404.\n2. Gordon E, Barnett KJ, Cooper NJ, Tran N, Williams LM (2008). An ‘Integrative Neuroscience’ platform: Applicatn to profilesfnegativity and positivity bias. Journal of Integrative Neuroscience, 7, 345-366.\n3.	Farah, M.J., Wilson, K.D., Drain, M. (1998). Psychol. Review, 105, 482-498.\n4.	Ellis, H.D., Young, A.W. (editors) (1989). Are faces special? In Handbook of research on face processing.. Elsevier Science, Amsterdam.");
		brainGame.infoSize = 18
		brainGame.shadow = false;
		brainGame.size = 200;
		this.loading.destroy();
		this.state.start('Title', false, false, brainGame);	
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
};