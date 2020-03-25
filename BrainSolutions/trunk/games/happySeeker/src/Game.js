function Face(key, emotion)
{
	this.data =
	{
		key: key,
		emotion: emotion
	};

}

Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.timer;
	this.miscTimer;
	this.answerTimer;
	this.answerDuration = 0.2;
	this.duration = 61; // Duration of exercise in seconds
	this.level = 1;
	this.levelSprite;
	this.clockwise = true;
	this.bubbles = [];
	this.maxBubbleCount;
	this.count;
	this.pie;
	this.happyBubble = null;
	this.correct = false;
	this.faces = [];
	for(i=0; i < 41;i++)
	{
		this.faces[i] = i;
	}
	this.emotions = [0,1,2,4,5,6];
	this.brainGame = null
};

Brain.Game.prototype = 
{
	init: function( brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame

	},
	create: function() 
	{
		this.s_lose = Brain.game.add.audio("s_lose");
		this.s_win = Brain.game.add.audio("s_win");
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		var game = Brain.game;
		this.timer = Brain.game.time.create(false);
		this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.answerTimer = Brain.game.time.create(false);
		this.answerTimer.add(this.answerDuration * 1000, this.TimeOut, this);

		var circle = Brain.AddSprite("center-circle", Brain.game.canvas.width / 2, Brain.game.canvas.height / 2, 150, 150, 0.5, 0.5);
		this.levelText = Brain.AddText("LEVEL", circle.centerX, circle.y - circle.height / 4.6, Color.gray, 22, 0.5, 0.5, "normal", 1000, "LatoRegular");
		this.info = Brain.AddText("WHO IS HAPPY?", circle.centerX, circle.y - circle.height / 4.6, Color.gray, 20, 0.5, 0.5, "normal", 80, "LatoRegular");
		this.info.centerX = circle.centerX;
		this.info.centerY = circle.centerY;
		this.info.align = "center";
		this.info.visible = false;
		this.gameScreen = Brain.game.add.group();

		this.levelSprite = Brain.AddText("1", circle.centerX, circle.y + circle.height / 15, Color.gray, 70, 0.5, 0.5, "bold", 1000, "LatoRegular");
		this.levelSprite.fontWeight = "bold";
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(circle);
	 	this.levelStartScreen.add(this.info);
	 	this.levelStartScreen.add(this.levelText);
	 	this.levelStartScreen.add(this.levelSprite);
		this.levelSprite.alpha = 0;
		this.levelText.alpha = 0;
        this.pie = new PieProgress();
	 	this.pie.Create(game, game.width / 2, game.height / 2, 176 / 2, Color.purple, -90, 0.05);

	 	this.gameScreen.visible = false;
	 	this.bubbleGroup = Brain.game.add.group();
		this.Init();
		this.levelStartScreen.add(this.pie.image);
	},

	Init: function()
	{
		this.score = 0;
		this.level = 1;
		this.count = 2;
		this.maxBubbleCount = 10;

		this.timer.start();
		this.timer.pause();
		this.miscTimer.start();
		HudManager.Init(this);
	},

	BubbleSetup: function()
	{
		this.bubbles = [];

		this.clockwise = !this.clockwise;
		var game = Brain.game;
		var faceArray = CopyCollection(this.faces);
		var faceRand = GetRandomInt(0, faceArray.length);
		var face = new Face("face"+ faceRand, emotRand);

		for(i = 0; i < this.count; i++)
		{			
			faceRand = GetRandomInt(0, faceArray.length);
			var emotRand =this.emotions[ GetRandomInt(0, this.emotions.length)];
			var newFace = new Face("face"+ faceRand, emotRand);
			var bubble = new Bubble();
			var size = 400 - 250 * this.count / 8;
			size = MinMax(size, 80, 200);
			if(this.level % 2 != 0 && this.level <= 8)
			{				
				newFace.data.key = face.data.key;
			}
			bubble.Create(this, game.width / 2, game.height / 2, this.clockwise, size, newFace, 200);

			bubble.centerX = game.width / 2;
			bubble.centerY = game.height / 2;

			this.bubbles[i] = bubble;

		}
		this.bubbles[0].faceSprite.frame = 3;
		this.happyBubble = this.bubbles[0]
		this.bubbles = Shuffle(this.bubbles, game);
	},

	update: function() 
	{
		HudManager.Update();
        var currentTime = this.answerTimer.ms / 1000;
    	var percent = currentTime / this.answerDuration;
		this.pie.progress = percent;
		this.pie.UpdateProgress();

		for(i = 0; i < this.bubbles.length; i++)
		{				
			this.bubbles[i].Update();
		}
	},

	LevelStart: function()
	{		
		this.levelStartScreen.visible = true;
		this.gameScreen.visible = true;
		this.info.visible = true;
		this.gameReady = true;
		this.answerTimer.start();
		this.answerTimer.resume();
		this.timer.resume();
		this.levelSprite.visible = false
		this.levelText.visible = false
		for(i = 0; i < this.count; i++)
		{			
			var bubble = this.bubbles[i];
			bubble.Init(i + 1);	
		}
	},

	LevelDelay: function()
	{			
		FreeCollection(this.bubbles);
		this.info.visible = false;
		this.levelSprite.alpha = 0;
		this.levelText.alpha = 0;
		this.correct = false;
		this.levelSprite.visible = true
		this.levelText.visible = true
		Brain.TweenFade(this.levelSprite, 1, true, 1, 0);
		Brain.TweenFade(this.levelText, 1, true, 1, 0);
		this.answerTimer.destroy();
		this.answerDuration = this.answerDuration - 2 * (this.level / 100);
		this.answerDuration = MinMax(this.answerDuration, 3, 10);
		this.answerTimer = Brain.game.time.create(true);
		this.answerTimer.add(this.answerDuration * 1000, this.TimeOut, this);
		this.levelStartScreen.visible = true;
		this.gameScreen.visible = false;
		this.levelSprite.text = this.level;

	 	this.BubbleSetup();
	 	this.pie.color= Color.purple;
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
	},
	TimeOut: function()
	{
		console.log("yay")
		this.gameReady = false;
		for(i=0; i < this.count;i++)
		{
			this.bubbles[i].Show();
		}
		
		this.miscTimer.add(0.5 * 1000, this.LevelEnd, this);
		this.miscTimer.start()
	},
	LevelEnd: function()
	{		
		console.log("level end");
		var game = Brain.game;
		this.gameReady = false;
		var nextLevel = 0;
		if(this.correct == true)
		{
			this.pie.color = Color.green;
			this.level += 1;
			nextLevel += this.level % 2 != 0;
		}
		else
		{
			this.pie.color = Color.red;
			this.level -= 1;
			this.s_lose.play();
			nextLevel -= this.level % 2 == 0;
		}

		for(i=0; i< this.count;i++)
		{
			this.bubbles[i].Outro();
		}
		this.count += nextLevel;
		this.count = MinMax(this.count, 2, 8);
		this.level = MinMax(this.level, 1, 999);
		this.timer.pause();
		this.answerTimer.pause();

		this.miscTimer.add(1 * 1000, this.LevelDelay, this);
	},

	ExerciseEnd: function()
	{
		var game = Brain.game;
		game.state.start("Result", true, false, this, "You are one step closer to increasing your automatic positivty.", this.brainGame);
		this.timer.destroy();
		this.miscTimer.destroy();
		HudManager.Free();
		this.gameScreen.destroy();
		this.levelStartScreen.destroy();
		FreeCollection(this.bubbles);
	},

	gofull: function() 
	{
		if (this.scale.isFullScreen) 
		{
			this.scale.stopFullScreen();
			//this.fullscreenbutton.visible = true;
		} else 
		{
			this.scale.startFullScreen(false);
			//this.fullscreenbutton.visible = false;
		}
	},

	exitPress: function () 
	{
	    Brain.popup = new PopUp(this.game);

	    Brain.popup.create("Are you sure you want to exit the test now?", "", ["YES, EXIT NOW", "RETURN TO TEST"], [this.exit, this.unpause], 3);
	},

	unpause: function (event) 
	{
	    if (event.game.paused == true) 
	    {
	        event.game.paused = false;
	    }
	},

	exit: function () 
	{
	    window.location = this.exitURL;
	},
};