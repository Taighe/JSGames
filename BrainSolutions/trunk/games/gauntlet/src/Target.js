function Target( x, y, width, height, radialPos, length, speed)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, 0, 0, "target");
	this.width = width;
	this.height = height;
	this.type = "Target";
	this.centerX = x;
	this.centerY = y;
	this.container = game.add.group(this);
	this.container.centerX = this.centerX;
	this.container.centerY= this.centerY;
	this.anchor.setTo(0.5, 0.5);
	this.length = {value: length}
	this.radialPos = radialPos;
	this.time = null;
	this.speed = speed;
	game.physics.arcade.enable(this);
	game.add.existing(this);
}

Target.prototype = Object.create(Phaser.Sprite.prototype);
Target.prototype.constructor = Target;

Target.prototype.update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	var centerY = game.height * 0.6
	this.time += this.speed * dt;
	this.centerX = Brain.centerX + this.length.value * Math.sin(this.time - this.radialPos);
	this.centerY = centerY + this.length.value * Math.cos(this.time - this.radialPos);
	var toCenter = Math.atan2(Brain.centerX - this.centerX, centerY - this.centerY);
	this.container.x = -this.x + this.length.value * Math.sin(this.time - this.radialPos);
	this.container.y = -this.y + this.length.value * Math.cos(this.time - this.radialPos);
	//this.rotation = -toCenter;
}

Target.prototype.Free = function()
{
	this.destroy();
}