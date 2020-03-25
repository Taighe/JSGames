Brain.Game = function(game) 
{
	// Default game variabels
	this.isDebug = null;
	this.gameReady = false;
	this.timer = null;
	this.miscTimer = null;
	this.duration = 61; // Duration of exercise in seconds
	this.level = null;
	this.levelSprite = null;
	this.score = null;
	this.correct = false;
	this.index = 0
	//
};

Brain.Game.prototype = 
{
	init: function(brainGame)
	{
		var game = Brain.game;
		this.index = 0
		this.brainGame = brainGame
		var group1 = new Phaser.Group(game, 0, 0);
		var text1 = new Phaser.Text(game, 0, 0, "Memorize the safe path from       to ", {fontSize: 32, fontWeight: "normal"});
		text1.font = "LatoRegular";
		text1.fontWeight= "normal";
		var greenStar = new Phaser.Sprite(game, text1.width * 0.82, 0, "node", 0);
		var purpleStar = new Phaser.Sprite(game, text1.width, 0, "node", 1);
		var size = 40;
		greenStar.width = size;
	 	greenStar.height = size;
		purpleStar.width = size; 
		purpleStar.height = size;
		group1.add(text1);
		group1.add(greenStar);
		group1.add(purpleStar);
		
		var group2 = new Phaser.Group(game, 0, 0);
		var text2 = new Phaser.Text(game, 0, 0, "Touch & drag from the        to start", {fontSize: 32});
		text2.font = "LatoRegular";
		text2.fontWeight= "normal";
		var questionMark = new Phaser.Sprite(game, text2.width* 0.68, 0, "node", 5);
		questionMark.width = size; questionMark.height = size;
		group2.add(text2);
		group2.add(questionMark);

		var group3 = new Phaser.Group(game, 0, 0);
		var text3 = new Phaser.Text(game, 0, 0, "Avoid any contact with", {fontSize: 32});
		text3.font = "LatoRegular";
		text3.fontWeight= "normal";
		var redCross = new Phaser.Sprite(game, text3.width, 0, "node", 3);
		redCross.width = size; redCross.height = size;
		group3.add(text3);
		group3.add(redCross);

		var instructionsGame = [group1, group2, group3];
		this.instructions = instructionsGame;
		console.log(this.instructions)
		this.instructTimer = game.time.create(true)
		this.instructTimer.loop(5* 1000, this.InstructionsFade, this)
		this.instructions[this.index].centerX = game.width * 0.5;
		this.instructions[this.index].y = game.height * 0.2;
		game.add.existing(this.instructions[this.index]);
	},
	create: function() 
	{
		var game = Brain.game;
		this.isDebug = false;
		this.gameReady = false;
		this.game.stage.backgroundColor = Color.white;
		// default
		this.s_lose = Brain.game.add.audio("s_lose");
		this.score = 0;
		this.level = 1;
		this.timer = Brain.game.time.create(false);
		this.timer.add(this.duration * 1000, this.ExerciseEnd, this);
		this.miscTimer = Brain.game.time.create(false);
		this.miscTimer.add(0, this.LevelDelay, this);
		this.timer.start();
		this.timer.pause();
		this.miscTimer.start();
		HudManager.Init(this);
		var circle = Brain.AddSprite("center-circle", Brain.game.width / 2, Brain.game.height / 2, 250, 250, 0.5, 0.5, false);
		var levelText = Brain.AddText("LEVEL", circle.centerX, circle.y - circle.height / 4.6, Color.gray, 40, 0.5, 0.5, "normal", 500, "LatoRegular");
		this.levelSprite = Brain.AddText("1", circle.centerX, circle.y + circle.height / 15, Color.gray, 120, 0.5, 0.5, "bold", 500, "LatoRegular");
	 	this.levelStartScreen = Brain.game.add.group();
	 	this.levelStartScreen.add(circle);
	 	this.levelStartScreen.add(levelText);
	 	this.levelStartScreen.add(this.levelSprite);
	 	this.gameScreen = Brain.game.add.group();
	 	this.gameScreen.visible = false;
	 	//

	 	this.maze = new Maze(this, game.width / 2, game.height / 2);

	 	this.gameScreen.add(this.maze.group);
	},

	Init: function()
	{
		this.maze.Init();
		Brain.NumberGamesPlayed++;
	},

	update: function() 
	{
		// default
		HudManager.Update();
		//
	},

	LevelStart: function()
	{		
		// default
		this.levelStartScreen.visible = false;
		this.gameScreen.visible = true;
		this.gameReady = true;
		this.timer.resume();
		this.Init();
		//
	},

	LevelDelay: function()
	{			
		// default
		var game = Brain.game;

		this.levelStartScreen.visible = true;
		this.gameScreen.visible = false;
		this.levelSprite.text = this.level;
		this.miscTimer.add(1 * 1000, this.LevelStart, this);
		// 
		this.maze.Free();
	},

	LevelEnd: function()
	{		
		// default
		var game = Brain.game;
		this.gameReady = false;
		this.timer.pause();
		this.InstructionsFade();
		if(this.correct == true)
		{
			this.level += 1;
		}
		else
		{
			this.s_lose.play();
			this.level -= 1;
		}

		this.level = MinMax(this.level, 1, 999);

		this.miscTimer.add(2 * 1000, this.LevelDelay, this);
		// 
	},

	ExerciseEnd: function()
	{
		// default
		var game = Brain.game;
		game.state.start("Result", true, false, this, "You are one step closer to improving your working memory.", this.brainGame);
		this.timer.destroy();
		this.miscTimer.destroy();
		this.maze.Free();
		HudManager.Free();
		//
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
	NextInstruction: function()
	{
		this.InstructionsFade() 
		this.index++
	},
	InstructionsFade: function()
	{
		var game = Brain.game
		if(this.index < this.instructions.length)	
		{	this.instructions[this.index].alpha = 1
			var fade = Brain.TweenFade(this.instructions[this.index], 0, true, 1, 0);
			fade.delay = 1*1000;
			var next = function()
			{
				if(this.instructions[this.index] != undefined)
				{
					this.instructions[this.index].centerX = game.width * 0.5;
					this.instructions[this.index].y = game.height * 0.2;
					game.add.existing(this.instructions[this.index]);
				}
			}
			if(this.index < this.instructions.length)	
				fade.onComplete.add(next, this)
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