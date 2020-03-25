Plate = function ()
{
	this.exercise = null;
	this.grid = null;
	this.id = null;
	this.group = null;
	this.sprite = null;
	this.icon = null;
	this.icons = null;
	this.x = null;
	this.y = null;
	this.tween = null;
	this.turned = false;
	return this;
};

//Plate.prototype = Object.create(Phaser.Sprite);

Plate.prototype.Create = function(exercise, x, y, id, icons, grid)
{
	var game = Brain.game;
	this.exercise = exercise;
	this.id = id;
	this.grid = grid;
	this.group = game.add.group();
	this.size = 200 - (150 * grid.maxMatches / 10);
	this.size = MinMax(this.size, 80, 200)
	this.sizeIcon = 120 - (100 * grid.maxMatches / 10);
	this.sizeIcon = MinMax(this.sizeIcon, 60, 140)
	this.sprite = Brain.AddSprite("circle", 0, 0, this.size, this.size, 0.5, 0.5);
	this.sprite.inputEnabled =true;
	this.sprite.events.onInputDown.add(this.TurnOver, this);
	this.icons = icons;
	this.icon = Brain.AddSprite(this.icons[this.id], 0, 0, this.sizeIcon, this.sizeIcon, 0.5, 0.5);
	this.group.add(this.sprite);
	this.group.add(this.icon);
	this.group.centerX = x;
	this.group.centerX = y;

}

Plate.prototype.Update = function()
{
}

Plate.prototype.ChangeId = function(id)
{
	var game = Brain.game;
	this.id = id;
	this.icon.destroy();
	this.icon = Brain.AddSprite(this.icons[this.id], 0, 0, this.sizeIcon, this.sizeIcon, 0.5, 0.5);
	this.icon.alpha = 0;
	this.tween = game.add.tween(this.icon);
	this.group.add(this.icon);
}

Plate.prototype.SetPosition = function(pos)
{
	this.group.x = pos.x;
	this.group.y = pos.y;
}

Plate.prototype.GetPosition = function()
{
	return new Vector(this.group.x, this.group.y);
}

Plate.prototype.Free = function()
{
	console.log("Memory Free");
	this.sprite.destroy();
	this.icon.destroy();
}

Plate.prototype.Intro = function()
{
	var game = Brain.game;
	this.turned = false;
	this.tween = game.add.tween(this.icon);
}

Plate.prototype.Reset = function()
{
	var game= Brain.game;

	this.tween.to({alpha: 0}, 0.1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	this.tween.onComplete.add(this.Intro, this);
}

Plate.prototype.In = function()
{
	this.tween.to({alpha: 1}, 0.2 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
}

Plate.prototype.TurnOver = function()
{
	var game= Brain.game;
	
	if(this.exercise.gameReady == true && this.turned == false)
	{
		this.turned = true;
		this.In();
		console.log(this.id);
		this.grid.currentMatch.push(this);
		console.log(this.grid.currentMatch);
		this.grid.CheckMatch();
	}
}