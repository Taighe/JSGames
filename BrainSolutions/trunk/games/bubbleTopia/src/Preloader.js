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

		this.game.load.image("bubble", "assets/bubble.png");
		this.game.load.image("title", "assets/title.jpg");
		this.game.load.image("hud", "assets/hud.jpg");
		this.game.load.image("result", "assets/result.jpg");

		this.game.load.audio("s_pop", "assets/audio/Bubble_Pop_07.mp3");
    	this.game.load.start();

	},
	create: function()
	{
		var game = Brain.game;
		Brain.GameId = "BubbleTopia";
		
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
		var text1 = new Phaser.Text(game, 0, 0, "Pop the bubbles containing positive words.", {fontSize: 33, fontWeight: "normal"}); text1.font = "LatoRegular";
		var text2 = new Phaser.Text(game, 0, 0, "Avoid negative words. You have 60 seconds!", {fontSize: 33, fontWeight: "normal"}); text2.font = "LatoRegular";
		var instructions = ["Become an expert at tuning into positive feelings."];


		var brainGame = new BrainGame("BubbleTopia", "bubble", instructions, "Science Summary\n\nPositive feelings have a ‘contagious’ effect, enhancing the wellbeing of yourself and those around you. Negative feelings have a similar contagious effect, and can spread worry and stress if they persist. Optimizing positive feelings and mastering stress is associated with the ability to respond rapidly to positive information, and ignore the negative. When feeling stressed and down, responses to this positive information are slowed, and the negative information stands out. This has been referred to as a ‘mood congruent bias’ (1,2). It has been linked to systems involving the frontal brain regions (3).\n\n1.	Erickson K et al.. (2005). American Journal of Psychiatry, 162, 2171-2173.\n2.	Murphy FC et al. (1999). Psychological Medicine, 29, 1307–1321\n3.	Elliott R et al. (2002). Archives of General Psychiatry, 2002, 597-604.");
		brainGame.infoSize = 22
		this.loading.destroy();
		this.state.start('Title', false, false, brainGame);	
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}
};