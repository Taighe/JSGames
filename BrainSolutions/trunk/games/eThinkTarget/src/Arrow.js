Arrow = function (exercise, x, y)
{
	var game = Brain.game;
	this.exercise = exercise;
	this.target = null;

	Phaser.Sprite.call(this, game, x, y, "arrow");
	this.anchor.set(0.5, 0.5);
	this.origHeight = this.height;
	this.width = 50

	game.add.existing(this);
	return this;
};

Arrow.prototype = Object.create(Phaser.Sprite.prototype);
Arrow.prototype.constructor = Arrow;

Arrow.prototype.Init = function()
{		
	var game = Brain.game;
	this.height = 100;
	this.visible = false;
}

Arrow.prototype.FiredEvent = function(target)
{
	var game = Brain.game;
	this.visible = true;
	var manager = this.exercise.manager
	var dir = game.math.degToRad(manager.windDirection)
	var gravity = manager.distance * 10
	console.log(dir)
	var windOffset = new Vector((15 * manager.windValue) * Math.cos(dir), (15 * manager.windValue) * Math.sin(dir))
	var width = this.width;
	var height = this.height * 0.3;
	if(target.y < this.y)
		height = -this.height * 0.3;
	var diff = new Vector(((this.x - target.x) / target.width * 2), ((this.y - target.y) / target.height * 2  ));
	var offset = new Vector((this.x + target.width * diff.x - windOffset.x * manager.distance / 15), (this.y + target.height * diff.y - windOffset.y * manager.distance / 15) + gravity * manager.distance / 50);
	var size = game.add.tween(this);
	size.to({ x: offset.x, y: offset.y}, 0.6*1000 * manager.distance / 15, Phaser.Easing.Quadratic.In, true, 0, 0, false);
	this.target = target;
	size.onComplete.add(this.GetScore, this);
	var tween = game.add.tween(this);
	tween.to({ height: height}, 0.5*1000 * manager.distance / 15, Phaser.Easing.Linear.None, true, 0, 0, false);

}

Arrow.prototype.GetScore = function()
{
	var game = Brain.game;
	var point = new Vector(this.x, this.y);
	var target = new Vector(this.target.x + 5, this.target.y + 5);
	var dis = Distance(point, target);
	var bullseye = Brain.AddText("BULLSEYE!", game.width * 0.5, game.height * 0.2, Color.white, 42, 0.5, 0.5, "bold", 900, "LatoRegular") 
	bullseye.bringToTop()
	var destroy = function()
	{
		bullseye.destroy()
	}
	bullseye.visible = false
	game.time.events.add(2 * 1000, destroy, this)
	var scoreMultiplier = 30
	var score = this.exercise.level * scoreMultiplier;

	if(dis < 9)
	{	
		score *= 15;
		bullseye.visible = true
	}
	else if(dis < 15)
	{	
		score *= 10;
	}
	else if(dis < 35)
	{
		score *= 5;
	}
	else if(dis < 50)
	{
		score *= 4;
	}
	else if(dis < 100)
	{
		score *= 3;
	}
	else if(dis < 150)
	{
		score *= 2;
	}
	else if(dis <= 200)
	{
		score *= 1;
	}

	this.exercise.levelStartScreen.add(new Mark(this.x, this.y));
	this.exercise.score += score;
	this.exercise.LevelEnd();

}

Arrow.prototype.update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;

}

Arrow.prototype.Free = function()
{
	console.log("Memory Free");
}