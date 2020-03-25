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
		this.game.load.spritesheet("button", "../../images/UI/button.png", 200, 76, 2);

		this.game.load.image("maze", "assets/HeaderGraphic.png");
		this.game.load.image("pulse", "assets/pulse.png");
		this.game.load.spritesheet("node", "assets/node.png", 272, 272, 6);
		this.game.load.audio("s_winNode1", "assets/audio/win_sound__01.mp3");
		this.game.load.audio("s_winNode2", "assets/audio/win_sound__02.mp3");
		this.game.load.audio("s_winNode3", "assets/audio/win_sound__03.mp3");
		this.game.load.audio("s_winNode4", "assets/audio/win_sound__04.mp3");
		this.game.load.audio("s_winNode5", "assets/audio/win_sound__05.mp3");
		this.game.load.audio("s_winNode6", "assets/audio/win_sound__06.mp3");
		this.game.load.audio("s_winNode7", "assets/audio/win_sound__07.mp3");
		this.game.load.audio("s_winNode8", "assets/audio/win_sound__08.mp3");
		this.game.load.audio("s_winNode9", "assets/audio/win_sound__09.mp3");
		this.game.load.audio("s_winNode10", "assets/audio/win_sound__10.mp3");
		this.game.load.audio("s_winNode11", "assets/audio/win_sound__11.mp3");
		this.game.load.audio("s_winNode12", "assets/audio/win_sound__12.mp3");
		this.game.load.audio("s_winNode13", "assets/audio/win_sound__13.mp3");
		this.game.load.audio("s_winNode14", "assets/audio/win_sound__14.mp3");
		this.game.load.audio("s_winNode15", "assets/audio/win_sound__15.mp3");
		this.game.load.audio("s_winNode16", "assets/audio/win_sound__16.mp3");
		this.game.load.audio("s_winNode17", "assets/audio/win_sound__17.mp3");
		this.game.load.audio("s_winNode18", "assets/audio/win_sound__18.mp3");
		this.game.load.audio("s_winNode19", "assets/audio/win_sound__19.mp3");
		this.game.load.audio("s_winNode20", "assets/audio/win_sound__20.mp3");
		this.game.load.audio("s_winNode21", "assets/audio/win_sound__21.mp3");
		this.game.load.audio("s_winNode22", "assets/audio/win_sound__22.mp3");
		this.game.load.audio("s_winNode23", "assets/audio/win_sound__23.mp3");
		this.game.load.audio("s_winNode24", "assets/audio/win_sound__24.mp3");
		this.game.load.audio("s_winNode25", "assets/audio/win_sound__25.mp3");
		this.game.load.audio("s_win", "assets/audio/win_sound.mp3");
		this.game.load.start();
	},
	create: function()
	{
		var game = Brain.game
		Brain.GameId = "MemoryMaze";
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
    	if (this.scale.isFullScreen)
        {
            this.scale.stopFullScreen();
        }
        else
        {
            this.scale.startFullScreen(true);
        }
        this.startButton.destroy();
		this.loading.destroy();

		
		var instructions = ["Become an expert at problem solving in the moment."];


		var brainGame = new BrainGame("Memory Maze", "maze", instructions, "Science Summary \n \nMemory Maze is designed to train your Working Memory and Executive Function skills. Efficient thinking relies on Working Memory capacity, which allows you to hold relevant information ‘online’ for later use or retrieval [1]. It is important for thinking flexibly and adaptively and relies on your ability to sustain attention on relevant information long enough to commit that information into memory.   Working Memory is an important part of the ‘Executive Function’ skills that are necessary for goal-directed behavior [1]. It allows you to anticipate outcomes and adapt to changing situations. The ability to think in abstract concepts is a considered a key aspect of executive function (also known as fluid intelligence).   Executive function has been found to reduce with age [2]. But, training your working memory skills and other ‘executive functions’ can provide enduring benefits that translate to your daily life [3].  \n\n 1.	Lezak, MD (1995(. Neuropsychological Assessment. 3rd edition. New York: Oxford University Press. \n 2.	Willis SL, Tennstedt SL, Marsiske M et al (2006). Long-term effects of cognitive training on everyday functional outcomes in older adults. \n 3. Jaeggi SM, Buschkuehl M, Jonides J & Perrig WJ (2008). Improving fluid intelligence with training on working memory. Proceedings of the National Academy of Sciences, 105 (19); 6829-6833.");
		brainGame.infoSize = 17
		this.state.start('Title', false, false, brainGame);
	},
	FileComplete: function(progress, cachekey, success, totalLoaded, totalFiles)
	{
		this.loading.text = "Loading " + progress + "%";
		this.loading.align = "center";
	}

};