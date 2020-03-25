function Distraction(exercise, x, y)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, x, y, "ball");
	this.shadow = Brain.AddSprite("shadow", this.centerX, this.game.height, 100, 50, 0.5, 0.5, false);
	this.width = 100;
	this.height = 100;
	this.gravity = 50;
	this.anchor.setTo(0.5, 0.5);
	this.velocity = new Vector(GetRandomFloat(-500, 500, game), GetRandomFloat(0, 500, game));
	this.maxVelocity = new Vector(900, 3000);
	this.minVelocity = new Vector(-900,-3000);
	this.physicsEnabled = true;
	this.exercise = exercise;
	this.timer = game.time.create(true);
	this.timer.add(5 * 1000, this.Outro, this);
	game.add.existing(this);
	
}

Distraction.prototype = Object.create(Phaser.Sprite.prototype);
Distraction.prototype.constructor = Distraction;

Distraction.prototype.create = function()
{
	var game = Brain.game;

};

Distraction.prototype.update = function()
{
	var game = Brain.game;
	
	if(this.physicsEnabled == true)
	{
		var dt = game.time.physicsElapsed;
		this.velocity.y += this.gravity;

		this.Bounds();

		this.velocity = this.velocity.MinMax(this.minVelocity, this.maxVelocity);
		this.x += this.velocity.x * dt;
		this.y += this.velocity.y * dt;
		this.angle += 25 * (this.velocity.x / this.maxVelocity.x);
		this.shadow.centerX = this.centerX;
		this.shadow.centerY = this.game.height - 50;
	}
};

Distraction.prototype.Bounds = function()
{
	var game = Brain.game;
	if(this.left < 0 )
	{
		console.log("left wall");
		this.left = 0;
		this.velocity.x *= -1;

	}

	if(this.right > game.width)
	{
		console.log("right wall");
		this.right = game.width;
		this.velocity.x *= -1;
	}

	if(this.bottom > game.height - 50)
	{
		this.bottom = game.height - 49;
		this.velocity.y *= -0.5;
		this.velocity.x *= 0.5;

		this.timer.start();
	}
}

Distraction.prototype.Outro = function()
{
	var game= Brain.game;
	var tween = game.add.tween(this.scale);
	var tweenPos = game.add.tween(this);
	var tweenRot = game.add.tween(this);
	tweenRot.to({rotation: 0}, 0.5* 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	tween.to({x: 0.3, y: 0.1}, 1* 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, true);
	tweenPos.to({x: this.centerX, y: 0}, 1* 1000, Phaser.Easing.Bounce.In, true, 1*1000, 0, false);
	tweenPos.onComplete.add(this.Free, this);
}

Distraction.prototype.Free = function()
{
	this.destroy();
	this.shadow.destroy();
}