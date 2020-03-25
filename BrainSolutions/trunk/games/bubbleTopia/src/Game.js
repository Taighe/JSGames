Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.timer;
	this.miscTimer;
	this.answerTimer;
	this.answerDuration = 5;
	this.duration = 31; // Duration of exercise in seconds
	this.level = 1;
	this.levelSprite;
	this.bubbles = [];
	this.negativeWords = ["Scared", "Afraid", "Frightened", "Anxious", "Stressed", "Tense", "Panic", "Nervous", "Worried", "Distress", "Confused", "Uneasy", "Shocked", "Pain", "Angry", "Hurt", "Frustrated", "Fury", "Rage", "Annoyed", "Upset", "Fuming", "Offended", "Hostile", "Bitter", "Resentful", "Spiteful", "Sad", "Lonely", "Grief", "Regret", "Pessimistic", "Unhappy", "Tearful", "Useless", "Vulnerable", "Empty", "Inferior", "Ashamed", "Miserable", "Sulky", "Hopeless", "Depressed", "Rejected", "Disappointed", "Disgusted", "Revulsion", "Contempt", "Envy", "Jealous"];
	this.positiveWords = ["Happy", "Glad", "Joy", "Joyous", "Delighted", "Amused", "Bliss", "Overjoyed", "Cheerful", "Enjoyment", "Jubilant", "Elated", "Satisfied", "Enthusiastic", "Excited", "Thrill", "Contented", "Pleasure", "Proud", "Triumph", "Eager", "Optimistic", "Rapt", "Relieved", "Playful", "Peace", "Serene", "Calm", "Free", "Relaxed", "Confident", "Energetic", "Inspired", "Love", "Passion", "Desire", "Affection", "Hope", "Brave", "Engaged", "Successful", "Admiration", "Terrific", "Cheerful", "Comforted", "Attracted", "Tender", "Fascinated", "Keen"];
	this.wordArray = [];
	this.maxBubbleCount;
	this.instructionsText = null;
	this.count;
	this.pie;
	this.correct = false;
	this.brainGame = null
};

Brain.Game.prototype = 
{
	init: function( brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame
		this.instructions = new Phaser.Text(game, 0,0, "Pop the bubbles containing positive words", {fontSize: 32, fontWeight: "normal"});
		this.instructions.font = "LatoRegular";
		this.instructions.addColor(Color.purple, 26);
		this.instructions.addColor(Color.black, 35);

		this.instructions.centerX = Brain.centerX;
		this.instructions.centerY = game.height * 0.2;

		game.add.existing(this.instructions);
	},
	create: function() 
	{
		this.s_lose = Brain.game.add.audio("s_lose");
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		var game = Brain.game;
		var temp = Brain.game.add.sprite(0, 0, "hud");
		temp.width = Brain.game.width;
		temp.height = Brain.game.height;
		temp.alpha = 0;
		this.timer = Brain.game.time.create(false);
		this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.answerTimer = Brain.game.time.create(false);
		this.answerTimer.add(this.answerDuration * 1000, this.LevelEnd, this);

		var circle = Brain.AddSprite("center-circle", Brain.game.canvas.width / 2, Brain.centerY + 50, 150, 150, 0.5, 0.5);
		this.levelText = Brain.AddText("LEVEL", circle.centerX, circle.y - circle.height / 4.6, Color.gray, 22, 0.5, 0.5, "normal", 1000, "LatoRegular");
		this.gameScreen = Brain.game.add.group();
		this.levelSprite = Brain.AddText("1", circle.centerX, circle.y + circle.height / 15, Color.gray, 70, 0.5, 0.5, "bold", 1000, "LatoRegular");
		this.levelSprite.fontWeight = "bold";
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(circle);
	 	this.levelStartScreen.add(this.levelText);
	 	this.levelStartScreen.add(this.levelSprite);
		this.levelSprite.alpha = 0;
		this.levelText.alpha = 0;
	 	//var dottedCircle = Brain.AddSprite("center-circle", Brain.game.width / 2, Brain.game.height / 2, 150, 150, 0.5, 0.5);
        this.pie = new PieProgress();
	 	this.pie.Create(game, game.width / 2, Brain.centerY + 50, 176 / 2, Color.purple, -90, 0.05);

	 	//this.gameScreen.add( dottedCircle);
	 	
	 	this.gameScreen.visible = false;
	 	this.bubbleGroup = Brain.game.add.group();
		this.Init();
		this.levelStartScreen.add(this.pie.image);
	},

	Init: function()
	{
		this.score = 0;
		this.level = 1;
		this.count = 3;
		Brain.NumberGamesPlayed++;
		this.maxBubbleCount = 7;

		this.timer.start();
		this.timer.pause();
		this.miscTimer.start();
		HudManager.Init(this);
	},

	BubbleSetup: function()
	{
		this.bubbles = [];
		this.wordArray = [];
		var game = Brain.game;	
		var positive = CopyCollection(this.positiveWords);
		var negative = CopyCollection(this.negativeWords);
		console.log(this.count);
		for(i = 0; i < this.count; i++)
		{
			if(i % 2 == 0)
			{
				this.wordArray[i] = positive[GetRandomInt(0, positive.length)];
				var index = positive.indexOf(this.wordArray[i]);
				console.log(this.wordArray[i]);
				positive.splice(index, 1);
			}
			else
			{
				this.wordArray[i] = negative[GetRandomInt(0, negative.length)];
				var index = negative.indexOf(this.wordArray[i]);
				console.log(this.wordArray[i]);
				negative.splice(index, 1);
			}			
		}
		console.log(this.wordArray);
		this.wordArray = Shuffle(this.wordArray, Brain.game);

		for(i = 0; i < this.count; i++)
		{			
			var bubble = new Bubble();
			bubble.Create(this, this.wordArray[i], 0, 0);
			bubble.centerX = Brain.centerX;
			bubble.centerY = Brain.centerY + 50;
			this.bubbles[i] = bubble;
			this.gameScreen.add(this.bubbles[i].sprite);
			this.gameScreen.add(this.bubbles[i].word);	
		}

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
		this.gameReady = true;
		this.answerTimer.start();
		this.answerTimer.resume();
		this.timer.resume();

		Brain.TweenFade(this.levelSprite, 0, true, 1, 0);
		Brain.TweenFade(this.levelSprite, 0, true, 1, 0);
		Brain.TweenFade(this.levelText, 0, true, 1, 0);
		for(i = 0; i < this.count; i++)
		{			
			var bubble = this.bubbles[i];
			bubble.Init(i + 1);	
		}
	},
	InstructionsFade: function()
	{
		var fade = Brain.TweenFade(this.instructions, 0, true, 1, 0);
		fade.delay = 1*1000;
	},
	LevelDelay: function()
	{			
		FreeCollection(this.bubbles);
		this.levelSprite.alpha = 0;
		this.levelText.alpha = 0;
		this.correct = false;

		Brain.TweenFade(this.levelSprite, 1, true, 1, 0);
		Brain.TweenFade(this.levelText, 1, true, 1, 0);
		this.answerTimer.destroy();
		this.answerDuration = this.answerDuration - 4 * (this.level / 100);
		this.answerDuration = MinMax(this.answerDuration, 3, 10);
		this.answerTimer = Brain.game.time.create(true);
		this.answerTimer.add(this.answerDuration * 1000, this.LevelEnd, this);
		this.levelStartScreen.visible = true;
		this.gameScreen.visible = false;
		this.levelSprite.text = this.level;
		this.count = 2 + this.level;

		if(this.count >= this.maxBubbleCount)
			this.count = this.maxBubbleCount;

	 	this.BubbleSetup();
	 	this.pie.color= Color.purple;
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
	},

	LevelEnd: function()
	{		
		console.log("level end");
		var game = Brain.game;
		this.gameReady = false;
		this.InstructionsFade();
		if(this.correct == true)
		{
			this.pie.color = Color.green;
			this.level += 1;
		}
		else
		{
			this.pie.color = Color.red;
			this.level -= 1;
			this.s_lose.play();
		}

		for(i=0; i< this.count;i++)
		{
			this.bubbles[i].Outro();
		}

		this.level = MinMax(this.level, 1, 999);
		this.timer.pause();
		this.answerTimer.pause();

		this.miscTimer.add(1 * 1000, this.LevelDelay, this);
	},

	ExerciseEnd: function()
	{
		var game = Brain.game;
		game.state.start("Result", true, false, this, "You are one step closer to tuning into your positive feelings.", this.brainGame);
		this.timer.destroy();
		this.miscTimer.destroy();
		HudManager.Free();
		this.gameScreen.destroy();
		this.levelStartScreen.destroy();
		FreeCollection(this.bubbles);
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