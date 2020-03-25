Bow = function (exercise, manager, x, y)
{
	var game = Brain.game;
	this.manager = manager;
	Phaser.Sprite.call(this, game, x, y, "crosshair");
	this.leftSide = 0;
	this.rightSide = 0;
	this.anchor.set(0.5, 0.5);
	this.centerX = x;
	this.centerY = y
	this.arrow = new Arrow(exercise, x, y);
	this.s_fire = game.add.audio("s_bow-release");
	this.s_prepare = game.add.audio("s_Bow-pullBack");
	game.add.existing(this);
	return this;
};

Bow.prototype = Object.create(Phaser.Sprite.prototype);
Bow.prototype.constructor = Bow;

Bow.prototype.Init = function(bottom, top, left, right, speed)
{		
	var game = Brain.game;
	this.arrow.Init();
	this.leftSide = left;
	this.rightSide = right;
	game.input.onDown.add(this.Prepare, this);
	game.input.onUp.add(this.Fire, this);
	this.anchor.set(0.82, 0.23);
	this.tween = game.add.tween(this);
	this.y = bottom
	this.tween.to({y: top}, speed*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
}

Bow.prototype.Fire = function()
{
	var game = Brain.game;
	this.s_fire.play()
	this.arrow.centerX = this.x - 15;
	this.arrow.centerY = this.y;
	this.manager.FiredEvent();
	this.arrow.FiredEvent(this.manager.target);
	game.input.onUp.removeAll();
	game.input.onDown.removeAll();
}

Bow.prototype.update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	var point = game.input.activePointer;
	this.x = point.x;
	this.y = point.y;
	this.x = MinMax(this.x, this.leftSide, this.rightSide + 25);
}

Bow.prototype.Prepare = function()
{
	this.s_prepare.play()
}

Bow.prototype.Free = function()
{
	console.log("Memory Free");
}