function Path(exercise, x, y, address, maze, note)
{
	var game = Brain.game;
	Node.call(this, exercise, x, y, address, maze);
	this.type = "Path";

}

Path.prototype = Object.create(Node.prototype);
Path.prototype.constructor = Path;

Path.prototype.Init = function()
{
	var game = Brain.game;
}

Path.prototype.Show = function()
{
	var game = Brain.game;
	Node.prototype.Show.call(this);
	this.sprite.frame = 2;
	if(this.selected)
	{
		this.sprite.frame = 4;
	}
}
Path.prototype.Finish = function()
{
	var game = Brain.game;
	Node.prototype.Finish.call(this);
	this.sprite.frame = 2;
	if(this.selected)
	{
		this.sprite.frame = 4;
	}
}

Path.prototype.Reveal = function()
{
	if(this.exercise.gameReady == false)
	{
		return;
	}
	Node.prototype.Reveal.call(this);
	console.log("path reveal");
	this.sprite.frame = 4;
	this.pulseSprite.tint = Color.greenHex;
	this.exercise.score += 10;
	this.maze.s_win[this.maze.note].play();
	this.maze.note++;
	this.pulseSprite.width = 80;
	this.pulseSprite.height = 80;
	this.pulseSprite.alpha = 0.6;
	var pulse = Brain.TweenScale(this.pulseSprite, 140, 140, true, 1, 0, 0);
	pulse.loop(-1);
	var fade = Brain.TweenFade(this.pulseSprite, 0, true, 1, 0);
	fade.loop(-1);

	return this;
}

Path.prototype.Hide = function()
{
	Node.prototype.Hide.call(this);
}

Path.prototype.Select = function()
{
	var game = Brain.game;
	Node.prototype.Select.call(this);
}

Path.prototype.Free = function()
{
	Node.prototype.Free.call(this);
	return this;
}