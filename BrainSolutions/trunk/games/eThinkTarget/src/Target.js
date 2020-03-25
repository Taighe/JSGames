Target = function (exercise, x, y)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, x, y, "target");
	this.width = 200;
	this.height = 400;
	this.tRight = 0;
	this.tLeft = 0;
	this.tBottom = 0;
	this.tTop = 0;
	this.exercise = exercise
	this.anchor.set(0.5 ,0.5);
	game.add.existing(this);
	return this;
};

Target.prototype = Object.create(Phaser.Sprite.prototype);
Target.prototype.constructor = Target;

Target.prototype.Init = function(distance)
{		
	var game = Brain.game;
	var size = 80;
	var halfWidth = 320 * 0.5;
	var halfHeight = 400 * 0.5;
	this.width = 320 - halfWidth * distance / 50;
	this.height = 400 - halfHeight * distance / 50;

	this.anchor.set(0.28, 0.20);
	this.tRight = this.x + size;
	this.tLeft = this.x - size;
	this.tBottom = this.y + size;
	this.tTop = this.y - size;
}

Target.prototype.FiredEvent = function()
{
	var game = Brain.game;
	var manager = this.exercise.manager
	var tween = game.add.tween(this);
	var width = 320* 3;
	var height = 400 * 3;
	tween.to({width: width, height: height}, 0.6*1000 * manager.distance / 15, Phaser.Easing.Quadratic.In, true, 0, 0, false);
	
}

Target.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	
}

Target.prototype.Free = function()
{
	console.log("Memory Free");
}