function Node(exercise, x, y, address, maze)
{
	var game = Brain.game;
	this.exercise = exercise;
	this.maze = maze;
	this.nodeAddress = address;
	this.group = game.add.group();
	this.group.inputEnableChildren = true;
	this.sprite = Brain.AddSprite("node", x, y, 0, 0, 0.5, 0.5, false);
	this.pulseSprite = Brain.AddSprite("pulse", x, y, 0, 0, 0.5, 0.5, false);
	this.x = this.sprite.centerX;
	this.y = this.sprite.centerY;
	this.type = null;
	this.hidden = true;
	this.selected = false;
	this.sprite.frame = 2;
	this.group.add(this.pulseSprite);
	this.group.add(this.sprite);
	this.scale =game.add.tween(this.sprite);
	this.pulseSprite.inputEnabled = false;
	this.fade = null;

	console.log("node made");
	return this;
}

Node.prototype.constructor = Node;

Node.prototype.Init = function()
{
	var game = Brain.game;
	return this;
}

Node.prototype.Show = function()
{
	var game = Brain.game;
	this.hidden = false;
	this.sprite.width = 0;
	this.sprite.height = 0;
	this.sprite.events.destroy();
	this.scale.stop();
	this.sprite.angle = -this.group.parent.angle;
	
	var tween = game.add.tween(this.sprite);
	tween.to({width: 80, height: 80}, 0.5 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
}

Node.prototype.Finish = function()
{
	var game = Brain.game;
	this.scale.stop();
	this.sprite.events.onInputOver.removeAll();
	if(this.selected == false)
		this.pulseSprite.visible = false;

}

Node.prototype.Select = function()
{
	var game = Brain.game;
	if(this.exercise.gameReady)
	{
		this.pulseSprite.visible = true;
	}

	this.pulseSprite.alpha = 0.6;
	var pulse = Brain.TweenScale(this.pulseSprite, 140, 140, false, 1, 0, 0);
	this.fade = game.add.tween(this.pulseSprite);
	this.fade.to({alpha: 0}, 1* 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
	this.scale.stop();
	this.scale.to({width: 100, height: 100}, 1* 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

	pulse.loop(-1);
	pulse.start();
	this.sprite.events.onInputOver.add(this.Reveal, this);
	this.sprite.frame = 5;
	this.pulseSprite.tint = Color.grayHex;
}

Node.prototype.Reveal = function()
{
	var game = Brain.game;
	this.exercise.NextInstruction()
	console.log("node reveal");
	this.hidden = false;
	this.selected = true;
	this.maze.previousNode = this.maze.currentNode;
	this.maze.currentNode = this;
	this.scale.stop();
	this.scale.to({width: 80, height: 80}, 0.1* 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	console.log(this.fade);
	this.sprite.width=  80;
	this.sprite.height=  80;
	var state = this.maze.CheckWin();
	if(state != "Game")
		return;

	if(this.maze.previousNode != null && this.maze.currentNode != null && state != "Lose")
	{
		var prevNode = this.maze.previousNode;
		var node = this.maze.currentNode;
		var graphics = game.add.graphics(0, 0);
		graphics.beginFill(Color.greenHex);
		graphics.lineStyle(10, Color.greenHex, 1);
		graphics.moveTo(prevNode.x, prevNode.y);
		graphics.lineTo(node.x, node.y);
		graphics.endFill();
		this.maze.group.add(graphics);
		this.maze.group.sendToBack(graphics);
	}

	this.maze.GetPath();
}

Node.prototype.Hide = function()
{
	this.hidden = true;
	this.sprite.frame = 2;
	this.sprite.width =80;
	this.sprite.height=80;
	this.pulseSprite.visible = false;
	this.scale.stop();
	this.scale.to({width: 80, height: 80}, 0.1* 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	this.sprite.events.destroy();
}

Node.prototype.Free = function()
{
	this.sprite.destroy();
	this.pulseSprite.destroy();
	return this;
}