function Maze(exercise, x, y)
{
	var game = Brain.game;
	this.exercise = exercise;
	this.nodes = [];
	this.currentNode = null;
	this.previousNode = null;
	this.pathNodes = [];
	this.startNode = null;
	this.endNode = null;
	this.size = 3;
	this.group = game.add.group();
	this.group.inputEnableChildren = true;
	this.levels = new Levels();
	this.note = 0;	
	this.s_win = [];
	for(i=1; i < 25; i++)
	{
		this.s_win.push(game.add.audio("s_winNode" + i));
	}
	this.s_complete = game.add.audio("s_win");
}

Maze.prototype.Init = function()
{
	var game = Brain.game;
	
	this.currentNode = null;
	this.note = 1;
	this.previousNode = null;
	this.group = game.add.group();
	this.size = 2 + this.exercise.level;
	this.size = MinMax(this.size, 2, 6);
	var halfSize = parseInt(this.size / 2);

	for(col = 0; col < this.size; col++)
	{
		this.nodes[col] = new Array(this.size)
		for(row = 0; row < this.size; row++)
		{
			this.nodes[col][row] = new Block(this.exercise, col * 110, row * 110, new Vector(col, row), this);
			this.group.add(this.nodes[col][row].group);	
		}
	}

	this.group.centerX = game.width / 2;
	this.group.centerY = game.height / 2;

	this.GeneratePath();
	this.Show();
}

Maze.prototype.GeneratePath = function()
{
	var game = Brain.game;
 	var index= 0;
 	var level = this.levels.GetLevel(this.exercise.level);

 	for(col=0; col < this.size; col++)
 	{
 		for(row=0; row < this.size; row++)
 		{
	 		if(level[index] == 2)
	 		{
	 			var node = this.nodes[col][row].Free();
	 			this.nodes[col][row] = new Start(this.exercise, node.x, node.y, node.nodeAddress, this);
	 			this.startNode = this.nodes[col][row];
	 			this.group.add(this.nodes[col][row].group);
	 		}
 			if(level[index] == 3)
	 		{
	 			var node = this.nodes[col][row].Free();
	 			this.nodes[col][row] = new End(this.exercise, node.x, node.y, node.nodeAddress, this);
	 			this.group.add(this.nodes[col][row].group);
	 		}
 			if(level[index] == 1)
	 		{
	 			var node = this.nodes[col][row].Free();
	 			this.nodes[col][row] = new Path(this.exercise, node.x, node.y, node.nodeAddress, this, index);
	 			this.group.add(this.nodes[col][row].group);
	 		}
	 		index++;
 		}
 	}
 	this.group.angle = 90 * GetRandomInt(0, 4);
 	this.group.centerX = Brain.centerX;
 	this.group.centerY = Brain.centerY;
	console.log("path generated");
}

Maze.prototype.Show = function()
{
	var game = Brain.game;
	var timer = game.time.create(true);
	var index = 0;
	this.exercise.timer.pause()
	for(col = 0; col < this.size; col++)
	{
		for(row = 0; row < this.size; row++)
		{
			timer.add(index * 1000, this.nodes[col][row].Show, this.nodes[col][row]);
			index+= 0.05;
		}
	}
	timer.add(3 * 1000, this.Hide, this);
	timer.start();
}

Maze.prototype.Reveal = function()
{
	var game = Brain.game;
	var timer = game.time.create(true);
	var index = 0;
	for(col = 0; col < this.size; col++)
	{
		for(row = 0; row < this.size; row++)
		{
			this.nodes[col][row].Finish();
		}
	}
}

Maze.prototype.Hide = function()
{
	var game = Brain.game;
	this.exercise.NextInstruction()
	for(col = 0; col < this.size; col++)
	{
		for(row = 0; row < this.size; row++)
		{
			this.nodes[col][row].Hide();
		}
	}
	this.exercise.timer.resume()
	this.startNode.Select();
}

Maze.prototype.CheckWin = function()
{
	var game = Brain.game;

	if(this.currentNode.type == "End")
	{
		console.log("Win");
		this.exercise.correct = true;
		this.Reveal();
		this.exercise.LevelEnd();
		return "Win";

	}
	if(this.currentNode.type == "Block")
	{
		console.log("Lose");
		this.exercise.correct = false;
		this.Reveal();
		this.exercise.LevelEnd();
		return "Lose";

	}
	return "Game";
}

Maze.prototype.GetPath = function()
{
	var address = this.currentNode.nodeAddress;
	for(i = 0; i < this.pathNodes.length;i++)
	{
		this.pathNodes[i].Hide();
	}
	this.pathNodes = [];

	var top = this.GetNode(address.x, address.y - 1);
	if(top != undefined && top.selected == false && top.type != "Start")
	{
		this.pathNodes.push(top);
		top.Select();
	}
	
	var down = this.GetNode(address.x, address.y + 1);
	if(down != undefined && down.selected == false&& down.type != "Start")
	{
		this.pathNodes.push(down);
		down.Select();
	}

	var left = this.GetNode(address.x - 1, address.y);
	if(left != undefined && left.selected == false&& left.type != "Start")
	{
		this.pathNodes.push(left);
		left.Select();
	}

	var right = this.GetNode(address.x + 1, address.y);
	if(right != undefined && right.selected == false&& right.type != "Start")
	{
		this.pathNodes.push(right);
		right.Select();
	}
}

Maze.prototype.GetNode = function(x, y)
{
	try
	{
	 	return this.nodes[x][y];
	}
	catch(err)
	{
		return undefined;
	}

}

Maze.prototype.Free = function()
{
	this.group.destroy();
}