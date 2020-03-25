Brain.Play = function() 
{
	// Default game variabels
	this.isDebug = null;
	this.gameReady = false;
	this.timer = null;
	this.miscTimer = null;
	this.duration = 31; // Duration of exercise in seconds
	this.level = null;
	this.levelSprite = null;
	this.score = null;
	this.ball = null;
	this.gameScreen = null;
	this.instructionsText = null;
	this.correct = true;
	this.index = 0
	this.brainGame = null
	//
};

Brain.Play.prototype = 
{
	init: function(instructions, level, brainGame)
	{
		var game = Brain.game;
		this.index = 0
		console.log(instructions);
		this.brainGame = brainGame
		this.instructions = instructions
		this.instructTimer = game.time.create(true)
		this.instructTimer.loop(5* 1000, this.NextInstruction, this)
		this.instructTimer.start()
		this.instructions[this.index].centerX = game.width * 0.5;
		this.instructions[this.index].y = game.height * 0.2;
		game.add.existing(this.instructions[this.index]);
		this.level = level
	},
	create: function() 
	{
		var game = Brain.game;
		console.log("game created");
		this.s_lose = Brain.game.add.audio("s_lose");
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		this.timer = Brain.game.time.create(false);
		this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.timer.start();
		this.timer.pause();
		this.miscTimer.start();
		
		this.distractTimer = game.time.create(false);
		this.distractTimer.loop(5 * 1000, this.Distract, this);

	 	this.gameScreen = Brain.game.add.group();
	 	this.gameScreen.visible = true;
	 	//
	 	this.floor = Brain.AddSprite("floor", 0, 0, game.width, 100, 0.5, 0.5);
	 	this.floor.centerX = game.width / 2;
	 	this.floor.bottom = game.height;
	 	this.wallL = Brain.AddSprite("wallL", 0, 0, 100, game.height, 0.5, 0.5);
	 	this.wallL.left = 0;
	 	this.wallL.bottom = game.height;
	 	this.wallR = Brain.AddSprite("wallR", 0, 0, 100, game.height, 0.5, 0.5);
	 	this.wallR.right = game.width;
	 	this.wallR.bottom = game.height;
	 	this.wallR.alpha = 0.7;
	 	this.wallL.alpha = 0.7;
	 	this.gameScreen.add(this.wallL);
	 	this.gameScreen.add(this.wallR);
	 	this.gameScreen.add(this.floor);

	 	this.ball = new Ball(this);
		this.ball.Create();
		this.gameScreen.add(this.ball.shadow);
		this.gameScreen.add(this.ball.sprite);

		this.circle = Brain.AddSprite("center-circle", Brain.game.width / 2, Brain.game.height * 0.1, 150, 150, 0.5, 0.5);
		this.levelText = Brain.AddText("LEVEL", this.circle.centerX, this.circle.y - this.circle.height / 4.6, Color.gray, 20, 0.5, 0.5, "normal", 1000, "LatoRegular");

		this.levelSprite = Brain.AddText("1", this.circle.centerX, this.circle.y + this.circle.height / 15, Color.gray, 70, 0.5, 0.5, "bold", 1000, "LatoRegular");
		this.levelSprite.fontWeight = "bold";
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(this.circle);
	 	this.levelStartScreen.add(this.levelText);
	 	this.levelStartScreen.add(this.levelSprite);
		this.levelStartScreen.alpha = 0;
		//this.start = new GenericButton("START", game.width * 0.5, game.height * 0.65, this.Start, this, 150, 70)
		this.Init();
	},

	Init: function()
	{
		var game = Brain.game;
		// default
		Brain.NumberGamesPlayed++;

		this.score = 0;
		this.correct = true;
		HudManager.Init(this);
		//
		this.levelUpTimer = game.time.create(true);
		this.levelDownTimer = game.time.create(true);
		for(var i = 1; i <= 10;i++)
		{
			this.levelUpTimer.add(i * 2 * 1000, this.LevelUp, this);
			this.levelDownTimer.add(i * 5 * 1000, this.LevelDown, this);
		}

		//this.levelDownTimer.start();
		//this.levelDownTimer.pause();
	},
	Start: function()
	{
		if(this.gameReady == false)
		{
			this.gameReady = true;
			//this.levelUpTimer.start();
			this.distractTimer.start();
			this.DisplayLevel();
		}
	},
	Distract: function()
	{
		var game = Brain.game;
		var dist = new Distraction(this, GetRandomFloat(0, game.width, game), 0);
		this.gameScreen.add(dist.shadow);
		this.gameScreen.add( dist);
	},
	update: function() 
	{
		// default
		HudManager.Update();
		//
		this.ball.Update(); 
		this.level = MinMax(this.level, 1, 10)
	},

	LevelStart: function()
	{				
		// default
		this.levelStartScreen.visible = true;
		this.gameScreen.visible = true;
		//this.timer.resume();

	},
	NextInstruction: function()
	{
		console.log(this.index)
		this.InstructionsFade() 
		this.index++
		this.index = Wrap(this.index, 0, this.instructions.length - 1)
	},
	InstructionsFade: function()
	{
		var game = Brain.game
		this.instructions[this.index].alpha = 1
		var fade = Brain.TweenFade(this.instructions[this.index], 0, true, 1, 0);
		fade.delay = 1*1000;
		var next = function()
		{
			this.instructions[this.index].centerX = game.width * 0.5;
			this.instructions[this.index].y = game.height * 0.2;
			game.add.existing(this.instructions[this.index]);
			this.instructions[this.index].alpha = 1
		}

		fade.onComplete.add(next, this)
	},
	Lose: function()
	{
		var game = Brain.game;
		this.levelDownTimer.pause();
		this.levelUpTimer.pause();
		var flash = game.add.tween(this.floor);
		flash.to({tint: Color.redHex}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 2, true);
		flash = game.add.tween(this.wallR);
		flash.to({tint: Color.redHex}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 2, true);
		flash = game.add.tween(this.wallL);
		flash.to({tint: Color.redHex}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 2, true);
	},

	LevelUp: function()
	{
		this.level += 1;
		this.level = MinMax(this.level, 1, 999);
		this.DisplayLevel();
	},
	LevelDown: function()
	{
		this.level -= 1;
		this.level = MinMax(this.level, 1, 999);
		this.DisplayLevel();
	},
	DisplayLevel: function()
	{
		var game = Brain.game;

		this.levelStartScreen.alpha = 0;
		this.circle.width = 0;
		this.circle.height = 0;
		var dismiss = function()
		{
			var fade = game.add.tween(this.levelStartScreen);
			fade.to({alpha: 0}, 0.2 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		}
		var timer = game.time.create(true);
		this.levelSprite.text = this.level;
		var tweenScale = game.add.tween(this.circle);
		tweenScale.to({width: 150, height: 150}, 1 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
		var wordScale = game.add.tween(this.levelText.scale);
		wordScale.to({x: 1, y: 1}, 0.5 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
		var lvlScale = game.add.tween(this.levelSprite.scale);
		lvlScale.to({x: 1, y: 1}, 0.5 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
		var tweenFade = game.add.tween(this.levelStartScreen);
		tweenFade.to({alpha: 1}, 0.2 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		timer.add(0.8 * 1000, dismiss, this);
		timer.start();
	},

	LevelDelay: function()
	{			
		// default
		var game = Brain.game;
		this.levelStartScreen.visible = true;
		this.gameScreen.visible = true;
		this.levelSprite.text = this.level;
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
		// 
	},

	LevelEnd: function()
	{		
		// default
		this.gameReady = false;
		this.timer.pause();
		this.level += 1;
		this.miscTimer.add(2 * 1000, this.LevelDelay, this);
		// 
	},

	ExerciseEnd: function()
	{
		// default
		var game = Brain.game;

		this.gameReady = false;
		game.state.start("Result", true, false, this, "You are one step closer to improving your focus.", this.brainGame);
		this.timer.destroy();
		this.miscTimer.destroy();
		HudManager.Free();
		// Award bonus for not dropping the ball
		if(this.correct == true)
			this.score += 5000 * this.level / 10;
		//
		this.index = MinMax(this.index, 0, this.instructions.length - 1)
		this.instructions[this.index].alpha = 0
		this.ball.Free();
		this.gameScreen.destroy();
		this.levelStartScreen.destroy();
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