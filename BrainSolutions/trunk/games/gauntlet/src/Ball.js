function Ball(gauntlet, x, y, width, height, radialPos, length, point)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, 0, 0, "greenBall");
	this.s_hit = game.add.audio("s_targetHit");
	this.gauntlet = gauntlet;
	this.width = width;
	this.height = height;
	this.maxWidth = width;
	this.maxHeight = height;
	this.exercise = gauntlet.exercise;
	this.centerX = x;
	this.centerY = y;
	this.anchor.set(0.5, 0.5);
	this.length = {value: length}
	this.radialPos = radialPos;
	this.type = "Ball";
	this.time = 0;
	this.point = point;
	this.pulse = Brain.AddSprite("pulse", this.centerX, this.centerY, 100, 100, 0.5, 0.5, false);
	this.pulse.tint = Color.greenHex;
	this.pulse.scale.set(0);
	game.physics.arcade.enable(this);
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.hitSprite, this);
    this.saved = false;
	game.add.existing(this);
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	this.time += 0.3 * dt;
	if(this.saved == true)
		return;

	var pos = new Vector(this.centerX, this.centerY);
	var lerpWidth = Phaser.Math.linear(this.width, 0.1, this.time);
	var lerpHeight = Phaser.Math.linear(this.height, 0.1, this.time);
	var lerpX = Phaser.Math.linear(pos.x, this.point.x, this.time);
	var lerpY = Phaser.Math.linear(pos.y, this.point.y, this.time);
	lerpWidth = MinMax(lerpWidth, 10, this.maxWidth);
	lerpHeight = MinMax(lerpHeight, 10, this.maxHeight);
	this.centerX = lerpX;
	this.centerY = lerpY;
	this.pulse.centerX = lerpX;
	this.pulse.centerY = lerpY;
	this.width = lerpWidth;
	this.height = lerpHeight;
	if(this.time >= 0.3 && this.saved == false)
	{
		this.Free();
	}
}

Ball.prototype.hitSprite = function(sprite1, sprite2)
{
	var game = Brain.game;

	if(sprite2.type == "Target" && this.time >=0.2 && this.saved == false)
	{
		this.exercise.LevelUp();
		this.s_hit.play()
		this.scale.set(0.2);
		this.saved = true;
		var dist = Distance(new Vector(this.centerX, this.centerY), new Vector(sprite2.centerX, sprite2.centerY))
		dist = dist / sprite2.width * 2.5
		var bonus = 1 - dist
		this.x = (this.x - sprite2.x) * 2.8
		this.y = (this.y - sprite2.y) * 2.8

		sprite2.addChild(this);

		console.log(bonus);
		var levelBonus = this.gauntlet.exercise.level;
		var score = Math.round(levelBonus * (100 * bonus));

		this.exercise.score += score;
		this.exercise.score = MinMax(this.exercise.score, 0, 99999);
	}
	
	if(sprite2.type == "Blocker" && sprite2.active == true)
	{
		this.exercise.score -= 20 * this.exercise.level;
		this.exercise.score = MinMax(this.exercise.score, 0, 99999);
		this.gauntlet.lastActiveBlocker.push(sprite2);
		this.Explode();
		sprite2.active =false
	}

}

Ball.prototype.Explode = function()
{
	var game = Brain.game;

	this.visible = false;
	var fade = game.add.tween(this.pulse);
	var freePulse = function()
	{
		this.pulse.destroy();
	}
	var scale = game.add.tween(this.pulse.scale);
	fade.to({alpha: 0}, 0.7 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	scale.to({x: 0.5, y: 0.5}, 0.7 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	scale.onComplete.add(freePulse, this);
	this.Free();
}

Ball.prototype.Free = function()
{
	
	this.destroy();
}