function Blocker(gauntlet, x, y, width, height, radialPos, length, speed)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, 0, 0, "purplecircle");
	this.width = width;
	this.height = height;
	this.gauntlet = gauntlet;
	this.centerX = x;
	this.centerY = y;
	this.type = "Blocker";
	this.active = false;
	this.exercise = gauntlet.exercise;
	this.anchor.setTo(0.5, 0.5);
	this.length = {value: length}
	this.radialPos = radialPos;
	this.time = null;
	this.speed = speed;
	this.s_pop = game.add.audio("s_pop")
	game.physics.arcade.enable(this);
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.Off, this);
	this.fade = game.add.tween(this)
	this.fade.to({alpha: 0}, 0.5*1000, Phaser.Easing.Linear.None, false, 0,0, false)
	this.frame = 1
	game.add.existing(this);
}

Blocker.prototype = Object.create(Phaser.Sprite.prototype);
Blocker.prototype.constructor = Blocker;

Blocker.prototype.update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	var centerY = game.height * 0.6
	this.time += this.speed * dt;
	this.centerX = Brain.centerX + this.length.value * Math.sin(this.time + this.radialPos);
	this.centerY = centerY + this.length.value * Math.cos(this.time + this.radialPos);
}

Blocker.prototype.Visible = function(visible)
{
	this.visible = visible
	if(visible == true)
		this.frame = 1
}

Blocker.prototype.Off = function()
{
	if(this.active == true)
	{
		this.exercise.score -= parseInt(this.exercise.score * 0.02);
		this.frame = 0
		console.log(this);
		this.exercise.LevelDown();
		this.s_pop.play()
		this.fade.start()
		this.fade.onComplete.add(this.Visible, this, false)
	}
}

Blocker.prototype.Free = function()
{
	this.destroy();
}