Ground = function (exercise, x, y)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, x, y, "grassyNull");
	this.anchor.set(1, 0.5);
	this.exercise = exercise

	game.add.existing(this);
	return this;
};

Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.Init = function()
{		
	var game = Brain.game;

}

Ground.prototype.Free = function()
{
	console.log("Memory Free");
}