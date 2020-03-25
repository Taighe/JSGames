Mark = function(x, y, width, height)
{
	var game = Brain.game;
	Phaser.Text.call(this, game, 0, 0, "x");
	this.fill = Color.white;
	this.stroke = Color.black;
	console.log(x + " " + y);
	this.strokeThickness = 3;
	this.anchor.set(0.5, 0.5);
	this.centerX = x - game.width * 0.5;
	this.centerY = y - game.height * 0.58;
	this.scale.set(1.3)
	game.add.existing(this);
	return this;
}

Mark.prototype = Object.create(Phaser.Text.prototype);
Mark.prototype.constructor = Mark;