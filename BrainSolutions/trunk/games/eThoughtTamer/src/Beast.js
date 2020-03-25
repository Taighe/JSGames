Beast = function (exercise, x, y, key, frameName, name, angle, presets)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, x, y, key);
	this.spriteKey = key
	this.exercise = exercise;
	this.presets = presets;
	this.fName = frameName
	this.name = name;
	this.index= 0;
	this.angle = angle;
	this.anchor.set(0.5, 0.5);
	this.animations.add("start", Phaser.Animation.generateFrameNames(frameName+"Start-", 1, 23, ".png", 4), 60, true);
	this.animations.add("active", Phaser.Animation.generateFrameNames(frameName+"Positive-Active-", 1, 23, ".png", 4), 60, true);
	this.animations.add("caught", Phaser.Animation.generateFrameNames(frameName+"TameBeastCaught-", 1, 23, ".png", 4), 60, true);
	this.animations.add("clutching", Phaser.Animation.generateFrameNames(frameName+"TameBeastClutching-", 1, 75, ".png", 4), 60, true);
	this.animations.add("nStanding", Phaser.Animation.generateFrameNames(frameName+"NegativeStanding-", 1, 75, ".png", 4), 60, true);
	this.animations.add("pStanding", Phaser.Animation.generateFrameNames(frameName+"PositiveStanding-", 1, 75, ".png", 4), 60, true);	
	this.animations.add("hanging", Phaser.Animation.generateFrameNames(frameName+"TameBeastHanging-", 1, 75, ".png", 4), 60, true);
	this.animations.play("nStanding", 30, true, false);
	this.centerX = x;
	this.centerY = y;
	game.add.existing(this);
	return this;
};

Beast.prototype = Object.create(Phaser.Sprite.prototype);
Beast.prototype.constructor = Beast;

Beast.prototype.Init = function()
{		
	var game = Brain.game;
}

Beast.prototype.Copy = function()
{
	var copy = new Beast(this.exercise, 0, 0, this.spriteKey, this.fName, this.name, 0, this.presets)
	this.visible =false;
	copy.sendToBack();
	return copy;
}

Beast.prototype.Wild = function()
{
	var game = Brain.game;
	this.exercise.manager.copy = this.Copy();
	var positions = [new Vector(game.width * 0.4, game.height * 0.9), new Vector(100, game.height * 0.5), new Vector(game.width * 0.3, 100), new Vector(game.width - 100, game.height * 0.6), new Vector(game.width * 0.6, game.height * 0.9)]
	var sizes = [1, 0.5, 0.7, 1.2, 1.7]
	this.exercise.manager.copy.centerX = Brain.centerX
	this.exercise.manager.copy.centerY = game.height * 0.9
	var tween = game.add.tween(this.exercise.manager.copy);
	tween.to({centerX: game.width * 0.5, centerY: -game.height * 0.5}, 0.5*1000, Phaser.Easing.Linear.None, false, 0, 0, false);
	
	for(i=0; i< 5; i++)
	{
		var scale = sizes[GetRandomInt(0, sizes.length)]
		var pos = positions[i]

		tween.to({centerX: pos.x, centerY: pos.y}, 0.5*1000, Phaser.Easing.Quadratic.Out, false, i*1000, 0, false)
	}
	tween.start();
	//this.animations.play("clutching", 30, true, false);
}

Beast.prototype.Selected = function()
{
	this.animations.play("clutching", 30, true, false);
}

Beast.prototype.PositiveStand = function()
{
	this.exercise.manager.copy.destroy();
	this.visible = true;
	this.animations.play("pStanding", 30, true, false);
}

Beast.prototype.update = function()
{
	if(this.centerY == 100)
	{
		this.animations.play("hanging", 30, true, false);
	}
	scroll(0,0)
}

Beast.prototype.Deselect = function()
{
	this.animations.play("nStanding", 30, true, false);
}

Beast.prototype.GetThought = function()
{
	this.index = MinMax(this.index, 0, this.presets.length - 1);
	return this.presets[this.index];
}

Beast.prototype.Free = function()
{
	console.log("Memory Free");
}