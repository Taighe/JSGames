function Levels()
{
	var game = Brain.game;
	var lvl1a = [0, 0, 3,
				0, 0, 1,
				2, 1, 1];
	var lvl1b = [3, 1, 1,
				 0, 0, 1,
				 0, 2, 1];

 	var lvl1c = [1, 1, 2,
				 1, 0, 0,
				 1, 3, 0];
 	this.levels1 = [lvl1a, lvl1b, lvl1c];

	var lvl2a = [0, 0, 0,0,
				1, 1, 1, 0,
				3, 0, 1, 0,
				0, 2, 1, 0];
	var lvl2b = [0, 0, 2,0,
				1, 1, 1, 0,
				1, 0, 0, 0,
				1, 3, 0, 0];

 	var lvl2c = [0, 1, 1,1,
				0, 1, 0, 1,
				0, 3, 0, 1,
				0, 0, 0, 2];
 	this.levels2 = [lvl2a, lvl2b, lvl2c];

	var lvl3a = [0, 1, 1,1,0,
				0, 1, 0, 1,1,
				0, 1, 0, 0,1,
				0, 3, 0, 0,2,
				0, 0, 0, 0,0];
	var lvl3b = [0, 1, 1,1,1,
				0, 1, 0, 0,3,
				0, 1, 0, 0,0,
				0, 1, 0, 0,0,
				2, 1, 0, 0,0];

 	var lvl3c = [1,1, 1, 1,0,
				3, 0, 0, 1,0,
				0, 0, 0, 1,0,
				0, 0, 0, 1,0,
				0, 0, 2, 1,0];
 	this.levels3 = [lvl3a, lvl3b, lvl3c];

	var lvl4a = [0,3,0,0,0,0,
				0,1,0,1,1,1,
				0,1,0,1,0,1,
				0,1,0,1,0,2,
				0,1,1,1,0,0,
				0,0,0,0,0,0];
	var lvl4b = [0,0,0,0,0,0,
				0,1,1,1,1,0,
				0,1,0,0,1,0,
				0,3,0,1,1,0,
				0,0,0,1,0,0,
				2,1,1,1,0,0];

 	var lvl4c = [0,0,0,0,1,3,
				1,1,1,1,1,0,
				1,0,0,0,0,0,
				1,0,0,0,1,2,
				1,0,0,0,1,0,
				1,1,1,1,1,0];
 	var lvl4d = [0,3,1,1,1,1,
				0,0,0,0,0,1,
				2,1,1,1,0,1,
				0,0,0,1,0,1,
				0,0,0,1,1,1,
				0,0,0,0,0,0];
 	var lvl4e = [0,1,1,1,1,1,
				0,1,0,0,0,1,
				0,1,1,1,0,1,
				0,0,0,1,0,1,
				0,0,0,1,0,1,
				0,0,2,1,0,3];
 	var lvl4f = [1,1,1,1,0,2,
				1,0,0,1,0,1,
				1,0,0,1,1,1,
				1,0,3,0,0,0,
				1,1,1,0,0,0,
				0,0,0,0,0,0];
 	var lvl4g = [0,0,0,0,0,0,
				0,1,1,1,0,3,
				0,1,0,1,0,1,
				0,1,0,1,0,1,
				0,2,0,1,0,1,
				0,0,0,1,1,1];
 	var lvl4h = [3,0,0,0,0,0,
				1,1,1,1,1,1,
				0,0,0,0,0,1,
				1,1,1,1,1,1,
				1,0,0,0,0,0,
				1,1,1,1,1,2];
 	var lvl4i = [0,0,1,1,1,0,
				0,0,1,0,1,0,
				0,1,1,0,1,1,
				2,1,0,3,0,1,
				0,0,0,1,0,1,
				0,0,0,1,1,1];
 	this.levels4 = [lvl4a, lvl4b, lvl4c, lvl4d, lvl4e, lvl4f, lvl4g, lvl4h, lvl4i];
}

Levels.prototype.constructor = Levels;

Levels.prototype.GetLevel = function(level)
{
	var game = Brain.game;
	if(level == 1)
	{
		var rand = parseInt(GetRandomFloat(0, this.levels1.length, game));
		return this.levels1[rand];
	}
	if(level == 2)
	{
		var rand = parseInt(GetRandomFloat(0, this.levels2.length, game));
		return this.levels2[rand];
	}
	if(level == 3)
	{
		var rand = parseInt(GetRandomFloat(0, this.levels3.length, game));
		return this.levels3[rand];
	}
	if(level >= 4)
	{
		var rand = parseInt(GetRandomFloat(0, this.levels4.length, game));
		return this.levels4[rand];
	}
}