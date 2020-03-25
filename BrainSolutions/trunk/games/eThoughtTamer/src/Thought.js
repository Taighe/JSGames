Thought = function (exercise, manager, x, y)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.bubble = new Phaser.Sprite(game, x, y, "speechBubble");
	this.bubble.alpha = 0.9;
	this.thought = new Phaser.Text(game, x, y, "");
	this.thought.fontColor = Color.black;
	this.thought.fontSize = 50
	this.thought.wordWrapWidth = 700;
	this.thought.wordWrap = true;
	this.thought.align = "center"
	
	this.thought.anchor.set(0.5, 0.5);
	this.bubble.anchor.set(0.5, 0.5);

	this.add(this.bubble);
	this.add(this.thought);
	this.thought.centerX = 0;
	this.thought.centerY = -100;
	game.add.existing(this);
	return this;
};

Thought.prototype = Object.create(Phaser.Group.prototype);
Thought.prototype.constructor = Thought;

Thought.prototype.Init = function()
{		
	var game = Brain.game;
	this.scale.set(0.5)
	this.x = game.width * 0.5
	this.y = game.height * 0.5
	this.Display(false)
}

Thought.prototype.Display = function(visible)
{
	var game = Brain.game;
	this.visible = visible
}

Thought.prototype.Update = function(thought)
{
	var game = Brain.game;

	this.thought.text = thought
}

Thought.prototype.Free = function()
{
	console.log("Memory Free");
}