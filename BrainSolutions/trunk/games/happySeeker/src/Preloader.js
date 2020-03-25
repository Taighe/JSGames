Brain.Preloader = function()
{
	this.startButton = null;
};

Brain.Preloader.prototype = 
{
	Start: function() 
	{
		this.game.load.image("whitePix", "../../images/UI/whitePix.png");
		this.game.load.image("full-screen", "../../images/UI/full-screen.png");
		this.game.load.spritesheet("exit", "../../images/UI/exit.png", 66, 65, 2);
		this.game.load.audio("s_lose", "../../audio/lose_sound.mp3");
		this.game.load.audio("s_win", "../../audio/win_sound.mp3");
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
		this.game.load.spritesheet("star-back", "../../images/UI/star-back.png", 260, 247, 3);

		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);
		this.game.load.spritesheet("circle", "assets/circle.png", 202, 202, 3);
		this.game.load.image("title", "../../images/title.jpg");
		this.game.load.image("end", "../../images/end.jpg");
		this.game.load.image("icon", "assets/HeaderImage.png");

		var index = 0;
		for(i=0;i< 20;i++)
		{
			this.game.load.spritesheet("face"+ index, "assets/female"+i+".png", 256, 320, 20);
			index++;
		}
		for(i=0;i< 21;i++)
		{
			this.game.load.spritesheet("face"+ index, "assets/male"+i+".png", 256, 320, 21);
			index++;
		}
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
		var instructions = ["Become an expert at being positively focused."];
		var brainGame = new BrainGame("eHappy Seeker", "icon", instructions, "Science Summary \n \n We react preferentially to cues of negative emotion and danger, since they are important to keeping us safe and out of danger [1-3]. It is difficult to focus on positive emotion and reward cues when your safety is not assured.  An excess of the bias towards negative emotion has been associated with stress, negative feelings, worry and even depression [4]. On the other hand, the capacity to focus on positive emotion cues is associated with a more positive outlook and better Self Regulation [5].  As we gain experience over age, we increase our bias towards happy cues, and reduce our bias towards negative emotion cues [6,7]. \n\n 1.	Williams LM et al. (2008). Journal of Integrative Neuroscience, 7, 367-404. \n2.	Williams LM, Gordon E. (2007). Neuroscientist, 13, 349-370. \n3.	Cacioppo, J.T., et al. (1998) Journal of Personality and Social Psychology, 76, 839-855. \n4.	Bradley, B. P., et al. (1995). Journal of Abnormal Psychology, 104, 3, 532–536 \n 5.	Gordon E, et al. (2008) Journal of Integrative Neuroscience, 7, 345-366. \n6.	Williams LM, et al. (2009). Journal of Clinical and Experimental Neuropsychology (in press). \n7.	Williams LM et al. (2007). Journal of Cognitive Neuroscience, 19, 1595 - 1608.");
		brainGame.size = 200;
		var instructionsText = new Phaser.Text(game, 0,0, "", {fontSize: 32, fontWeight: "normal"});
		brainGame.shadow = false;
		brainGame.infoSize = 18
		this.state.start('Title', false, false, brainGame, instructionsText);
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
};