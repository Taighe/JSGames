function Start(exercise, x, y, address, maze)
{
	var game = Brain.game;
	Node.call(this, exercise, x, y, address, maze);
	this.type = "Start";
}

Start.prototype = Object.create(Node.prototype);
Start.prototype.constructor = Start;

Start.prototype.Init = function()
{
	var game = Brain.game;
}

Start.prototype.Show = function()
{
	var game = Brain.game;
	Node.prototype.Show.call(this);
	this.sprite.frame = 0;
}

Start.prototype.Reveal = function()
{
	Node.prototype.Reveal.call(this);
	this.sprite.frame = 0;
	this.pulseSprite.tint = Color.greenHex;
	this.sprite.events.onInputOver.removeAll();
	this.maze.s_win[this.maze.note].play();
	this.maze.note++;
	return this;
}

Start.prototype.Finish = function()
{
	var game = Brain.game;
	Node.prototype.Finish.call(this);
	this.sprite.frame = 0;
}

Start.prototype.Hide = function()
{
	Node.prototype.Hide.call(this);
}

Start.prototype.Select = function()
{
	var game = Brain.game;
	Node.prototype.Select.call(this);
}

Start.prototype.Free = function()
{
	Node.prototype.Free.call(this);
	return this;
}