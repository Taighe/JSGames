GameManager = function (exercise)
{
	var game = Brain.game;
	this.copy = null;
	Phaser.Group.call(this, game);
	var presets = ["Changing or creating a habit", "Thinking of the past or future", "Work related", "Health related", "Relationship related"]
	var spacing = 15;
	this.exercise = exercise;
	this.button1 = new MenuItem( this, 0, 0, this.Menu1, this, "MY TAMED THOUGHTS", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 75, 15);

	this.button1.top = spacing;
	this.button1.left = spacing;
	this.button2 = new MenuItem( this, 0, 0, this.Menu2, this, "PICK A THOUGHT TO TAME",  Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 75, 14);
	this.button2.top = spacing;
	this.button2.left = this.button1.right +spacing;
	this.button3 = new MenuItem(this, 0, 0, this.Menu3, this, "CREATE NEW",  Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 75, 15);
	this.button3.top = spacing;
	this.button3.left = this.button2.right +spacing;
	this.info = new Phaser.Text(game, 0, 0, "Start Taming a Thought", {fill: Color.black, fontSize: 32});
	this.info.centerX = Brain.centerX;
	this.info.centerY = game.height * 0.5;
	this.topMenu = new TopMenu(this, this.exercise);
	this.scrollBox = new ScrollBox(this, this.exercise, Brain.centerX, Brain.centerY, presets, false, this.DisplayBeasts, this);
	this.add(this.button1);
	this.add(this.button2);
	this.add(this.button3);

	this.add(this.scrollBox);
	this.add(this.info);
	this.menu = game.add.group();
	this.ground = new Ground(this);
	this.ground.anchor.set(0.5, 0.5);
	this.beastMenu = new BeastMenu(this, this.exercise);
	this.beastMenu.centerX = game.width * 0.5;
	this.beastMenu.centerY = game.height * 1.45;
	this.menu.add(this.info);
	this.menu.add(this.beastMenu);
	this.menu.add(this.scrollBox);
	this.add(this.menu);
	this.thought = new Thought(this.exercise, this, 0, 0);
	this.selected = this.button3;
	game.add.existing(this);
	return this;
};

GameManager.prototype = Object.create(Phaser.Group.prototype);
GameManager.prototype.constructor = GameManager;

GameManager.prototype.Init = function()
{		
	var game = Brain.game;
	if(this.copy != null)
	{
		this.copy.destroy();
		this.copy = null;
	}
	this.Visible(true)
	this.DisplayMenu(true)
	this.selected = this.button3;
	this.scrollBox.Init("In what scenarios do you currently experience the most negative feelings?");
	this.beastMenu.Init();
	this.topMenu.Hide();
	this.thought.Init();
	this.button1.Enable(false)
	this.Menu3();
}

GameManager.prototype.Visible = function(visible)
{		
	var game = Brain.game;
	this.visible = visible;
	this.beastMenu.visible  =visible
	this.beastMenu.Display(visible)
}


GameManager.prototype.DisplayMenu = function(visible)
{		
	var game = Brain.game;
	this.button1.visible = visible
	this.button2.visible = visible
	this.button3.visible = visible
}

GameManager.prototype.Menu1 = function()
{
	var game = Brain.game;
	var tween = game.add.tween(this.menu);
	this.exercise.Visible(true)
	this.info.text = "Start Taming a Thought";
	this.info.fontSize = 32;
	this.info.wordWrap = false;
	this.info.y = game.height * 0.5;
	this.info.wordWrapWidth = 500;
	this.scrollBox.Display(false);
	this.menu.angle = 0;
	this.info.visible =true;
	tween.to({angle: 180}, 0.5*1000, Phaser.Easing.Linear.None, true, 0, 0, true);
	this.beastMenu.Display(false);
}

GameManager.prototype.Menu2 = function()
{
	var game = Brain.game;
	//var tween = game.add.tween(this.menu);
	this.info.visible =false;
	this.exercise.Visible(false)
	this.Visible(false)
	game.state.start("PickAThought", false, false, this.exercise);
}

GameManager.prototype.Menu3 = function()
{
	var game = Brain.game;
	this.Visible(true)
	this.exercise.Visible(true)
	this.scrollBox.Display(false);
	this.thought.Display(false)
	var tween = game.add.tween(this.menu);
	this.info.text = "";
	this.info.wordWrapWidth = 400;
	this.info.wordWrap = true;
	this.info.y = game.height * 0.3;
	this.info.fontSize = 25;
	this.menu.angle = 0;
	tween.to({angle: 180}, 0.5*1000, Phaser.Easing.Linear.None, true, 0, 0, true);
	tween.onComplete.add(this.beastMenu.Display, this.beastMenu, 0, true);
}

GameManager.prototype.DisplayBeasts = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS /1000;

	this.Menu3();
	this.topMenu.Init();
	this.DisplayMenu(false)
	this.topMenu.info.text = "Select the thought below that you may have in that scenario"
	this.topMenu.info.fontSize = 16;

	this.beastMenu.leftArrow2.visible = true;
	this.beastMenu.rightArrow2.visible = true;
	var doc = document.getElementById("hiddenInput");
	this.thought.Init();
	this.thought.Display(true)
	doc.value = this.beastMenu.currentThought
}

GameManager.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS /1000;
	this.beastMenu.Update();
}

GameManager.prototype.Free = function()
{
	console.log("Memory Free");
}