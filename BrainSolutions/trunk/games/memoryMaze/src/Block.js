function Block(exercise, x, y, address, maze)
{
	var game = Brain.game;
	Node.call(this, exercise, x, y, address, maze);
	this.type = "Block";
}

Block.prototype = Object.create(Node.prototype);
Block.prototype.constructor = Block;

Block.prototype.Init = function()
{
	var game = Brain.game;
}

Block.prototype.Show = function()
{
	var game = Brain.game;
	Node.prototype.Show.call(this);
	this.sprite.frame = 3;
}

Block.prototype.Reveal = function()
{
	Node.prototype.Reveal.call(this);
	this.sprite.frame = 3;
	this.pulseSprite.tint = Color.redHex;
	return this;
}
Block.prototype.Finish = function()
{
	var game = Brain.game;
	Node.prototype.Finish.call(this);
	this.sprite.frame = 3;
}
Block.prototype.Hide = function()
{
	Node.prototype.Hide.call(this);
}

Block.prototype.Select = function()
{
	var game = Brain.game;
	Node.prototype.Select.call(this);
}

Block.prototype.Free = function()
{
	Node.prototype.Free.call(this);
	return this;
}