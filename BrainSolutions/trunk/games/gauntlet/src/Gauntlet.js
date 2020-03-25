function Gauntlet(exercise)
{
	var game = Brain.game;
	console.log("new gauntlet");
	this.exercise = exercise;

	this.objects = game.add.group();
	this.group = game.add.group();
	var dottedcircle = Brain.AddSprite("dotted-circle", Brain.centerX, Brain.centerY, 600, 600, 0.5, 0.5, false);
	var circles = Brain.AddSprite("allcircle", Brain.centerX, Brain.centerY, 400, 400, 0.5, 0.5, false);
	this.group.add(dottedcircle);
	this.group.add(circles);
	this.pie = new PieProgress();
	this.pie.Create(game, game.width / 2, game.height / 2, dottedcircle.width * 0.52, Color.purple, -90, 0.03);
	this.pie.progress = 0;
	this.blockersActive = [];
	this.lastActiveBlocker = [];
	this.group.add(this.pie.image);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	var target = new Target(Brain.centerX, Brain.centerY, 70, 70, 0, 200 * 0.2, 0.3);
	this.objects.add(target);
	var index = 0;
	this.balls = game.add.group();
	// Inner circle
	for(i=0; i < 4; i++)
	{
		var quaterPI = (Math.PI * 2) / 4;
		var blocker = new Blocker(this, Brain.centerX, Brain.centerY, 15, 15, i * quaterPI, 200 * 0.45, -0.3);
		blocker.visible = false;
		this.blockersActive.push(blocker);
		this.objects.add(blocker);
		index++;
	}
	// Mid circle
	for(i=0; i < 4; i++)
	{
		var quaterPI = (Math.PI * 2) / 4;
		var blocker = new Blocker(this, Brain.centerX, Brain.centerY, 30, 30, i * quaterPI, 200 * 0.7, -1);
		blocker.visible = false;
		this.blockersActive.push(blocker);
		this.objects.add(blocker);
		index++;
	}
	// Outer circle
	for(i=0; i < 8; i++)
	{
		var quaterPI = (Math.PI * 2) / 8;
		var blocker = new Blocker(this, Brain.centerX, Brain.centerY, 50, 50, i * quaterPI, 200, -1.1);
		blocker.visible = false;
		this.blockersActive.push(blocker);
		this.objects.add(blocker);
		index++;
	}

	this.sling = new Sling(this, Brain.centerX, game.height * 0.6, 35, 35, 260, 1);
	this.group.add(this.sling);
	game.physics.arcade.enable(this.balls, this.objects);
}

Gauntlet.prototype.UpdateBlockers = function()
{
	var game = Brain.game;

	var index = this.exercise.level - 1;
	index = MinMax(index, 0, 15);
	if(this.lastActiveBlocker.length != 0)
	{
		var i = this.lastActiveBlocker.length - 1;
		this.lastActiveBlocker[i].active = true;
		this.lastActiveBlocker[i].Visible(true)
		this.lastActiveBlocker[i].alpha = 1
		this.lastActiveBlocker.splice(i, 1);
	}
	else
	{
		this.blockersActive[index].active = true;
		this.blockersActive[index].Visible(true)
		this.blockersActive[index].alpha = 1
	}
}

Gauntlet.prototype.Update = function()
{
	var game = Brain.game;
    var currentTime = this.exercise.timer.ms / 1000;
	var percent = currentTime / 61;

	this.pie.progress = percent;
	this.pie.UpdateProgress();
	game.physics.arcade.collide(this.objects, this.balls);
}

Gauntlet.prototype.Init = function()
{
	var game = Brain.game;
}

Gauntlet.prototype.Free = function()
{
	this.group.destroy();
	this.objects.destroy();
	this.balls.destroy();
	this.sling.Free();
}