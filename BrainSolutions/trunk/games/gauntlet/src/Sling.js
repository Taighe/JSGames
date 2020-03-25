function Sling(gauntlet, x, y, width, height, length, speed)
{
	var game = Brain.game;
	Phaser.Sprite.call(this, game, x, y, "");
	console.log(gauntlet);
	this.s_stretch = game.add.audio("s_stretch");
	this.s_fire = game.add.audio("s_sling");
	this.type = "Sling";
	this.width = width;
	this.height = height;
	this.centerX = x;
	this.centerY = y;
	this.anchor.setTo(0.5, 0.5);
	this.length = {value: length};
	this.pullback = {value: 0};
	this.radialPos = 0;
	this.time = null;
	this.speed = speed;
	this.gauntlet = gauntlet;
	var graphics = new Phaser.Graphics(game, 0,0);
	graphics.beginFill(Color.blackHex);
	graphics.drawCircle(this.left - 35, this.centerY, 10);
	graphics.drawCircle(this.right + 35, this.centerY, 10);
	graphics.endFill();
	var texture = graphics.generateTexture();
	this.sling = game.add.sprite(this.centerX, this.centerY, texture);
	this.sling.anchor.set(0.5, 0.5);
	this.arrow = game.add.sprite(this.centerX, this.centerY, "greenArrow");
	this.arrow.width = 20;
	this.arrow.height = 250;
	this.arrow.anchor.set(0.5, 0.5);
	this.ball = game.add.sprite(this.centerX, this.centerY, "greenBall");
	this.ball.width = 20;
	this.ball.height = 20;
	this.ball.anchor.set(0.5, 0.5);
	this.band = game.add.graphics(0,0);

	this.inputEnabled = true;
	game.input.onDown.add(this.PrepareSling, this);
	game.add.existing(this);
	this.pullbackTween = game.add.tween(this.pullback);
	this.tween = game.add.tween(this.ball);
}

Sling.prototype = Object.create(Phaser.Sprite.prototype);
Sling.prototype.constructor = Sling;

Sling.prototype.update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	var point = game.input.activePointer;
	if(point.identifier == null)
	{
		// Do something later
	}

	var center = new Vector(Brain.centerX, game.height * 0.6);
	var diff = new Vector(point.x - center.x, point.y - center.y);
	var previous = this.radialPos;
	var theta = Math.atan2(diff.x, diff.y);
	var dist = Math.abs(theta - previous)
	if(dist >= 5)
		previous = theta

	var lerp = Phaser.Math.linear(previous, theta, 0.1);
	this.radialPos = lerp;

	this.centerX = game.width *0.5 + this.length.value * Math.sin(this.radialPos);
	this.centerY = center.y + this.length.value * Math.cos(this.radialPos);

	var toCenter = Math.atan2(game.width *0.5- this.centerX, center.y - this.centerY);
	this.sling.centerX = this.centerX - this.pullback.value * Math.sin(toCenter);
	this.sling.centerY = this.centerY - this.pullback.value * Math.cos(toCenter);
	this.ball.centerX = this.centerX - this.pullback.value * Math.sin(toCenter);
	this.ball.centerY = this.centerY - this.pullback.value * Math.cos(toCenter);
	var offset = 80 + this.pullback.value * 1.5;
	this.arrow.centerX = this.centerX + offset * Math.sin(toCenter);
	this.arrow.centerY = this.centerY + offset * Math.cos(toCenter);
	this.rotation = -toCenter;
	this.sling.rotation = this.rotation;
	this.ball.rotation = this.rotation;
	this.arrow.rotation = this.rotation;
	this.UpdateSling(toCenter);
}

Sling.prototype.UpdateSling = function(radian)
{
	var slingWidth = this.sling.width * 0.5;
	var slingHeight = this.sling.height * 0.5;
	var ballWidth = this.ball.width * 0.5;
	var ballHeight = this.ball.height * 0.5;
	var point1 = new Vector(this.sling.centerX - slingWidth * Math.cos(-radian), this.sling.centerY - slingWidth * Math.sin(-radian) );
	var point2 = new Vector(this.sling.centerX + slingWidth * Math.cos(-radian), this.sling.centerY + slingWidth * Math.sin(-radian));
	var cP = new Vector(this.ball.centerX - (ballHeight + this.pullback.value) * Math.sin(radian), this.ball.centerY - (ballHeight + this.pullback.value) * Math.cos(radian));
	this.band.clear();
	this.band.lineStyle(2, Color.blackHex);
	this.band.moveTo(point1.x, point1.y);
	this.band.bezierCurveTo(cP.x, cP.y, cP.x, cP.y, point2.x, point2.y);
}

Sling.prototype.PrepareSling = function()
{
	var game = Brain.game;
	this.s_stretch.play();
	this.pullback.value = 0;
	this.ball.width = 30;
	this.ball.height = 30;
	game.input.onDown.removeAll(this);
	game.input.onUp.add(this.FireSling, this);
	this.pullbackTween.stop();
	this.tween.stop();
	this.tween = game.add.tween(this.ball);
	this.pullbackTween = game.add.tween(this.pullback);
	this.tween.to({height: 60, width: 60}, 0.7 * 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.pullbackTween.to({value: 25}, 0.7 * 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
}

Sling.prototype.FireSling = function()
{
	var game = Brain.game;
	this.s_fire.play();
	var force = 195 + Math.abs(this.pullback.value) * 2;
	var point = new Vector(this.centerX - force * Math.sin(this.radialPos), this.centerY - force * Math.cos(this.radialPos));
	var ball = new Ball(this.gauntlet, this.sling.centerX, this.sling.centerY, this.ball.width, this.ball.height, this.radialPos, this.length.value, point);
	this.gauntlet.balls.add(ball);
	game.input.onUp.removeAll(this);
	this.pullbackTween.stop();
	this.tween.stop();
	game.input.onDown.add(this.PrepareSling, this);
	this.tween = game.add.tween(this.ball);
	this.pullbackTween = game.add.tween(this.pullback);
	this.tween.to({height: 0, width: 0}, 0.1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, true);
	this.pullbackTween.to({value: -25}, 0.1 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, true);

	this.pullbackTween.onComplete.add(this.FiredSling, this);
}

Sling.prototype.FiredSling = function()
{
	var game = Brain.game;
	this.pullbackTween.stop();
	this.tween.stop();
	this.tween = game.add.tween(this.ball);
	this.pullbackTween = game.add.tween(this.pullback);

	//this.tween.to({height: 20, width: 20}, 0.1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	//this.pullbackTween.to({value: 0}, 0.1 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
}

Sling.prototype.Free = function()
{
	this.destroy();
	this.arrow.destroy();
	this.ball.destroy();
	this.sling.destroy();
	this.band.destroy();
}