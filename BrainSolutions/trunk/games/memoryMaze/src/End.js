function End(exercise, x, y, address, maze)
{
	var game = Brain.game;
	Node.call(this, exercise, x, y, address, maze);
	this.type = "End";
	console.log("end node made");
}

End.prototype = Object.create(Node.prototype);
End.prototype.constructor = End;

End.prototype.Init = function()
{
	var game = Brain.game;
}

End.prototype.Show = function()
{
	var game = Brain.game;
	Node.prototype.Show.call(this);
	this.sprite.frame = 1;
}

End.prototype.Finish = function()
{
	var game = Brain.game;
	Node.prototype.Finish.call(this);
	this.sprite.frame = 1;
}

End.prototype.Reveal = function()
{
	var game = Brain.game;
	Node.prototype.Reveal.call(this);
	this.sprite.frame = 1;
	this.pulseSprite.tint = Color.purpleHex;
	var burst = ParticleBurst(new Vector(this.sprite.world.x, this.sprite.world.y), "star", game, 0.1, 0.15, Color.white);
	this.pulseSprite.visible = true;
	this.exercise.score += 100 * this.exercise.level;
	this.maze.s_complete.play();
	return this;
}

End.prototype.Hide = function()
{
	Node.prototype.Hide.call(this);
}

End.prototype.Select = function()
{
	var game = Brain.game;
	Node.prototype.Select.call(this);
}

End.prototype.Free = function()
{
	Node.prototype.Free.call(this);
	return this;
}