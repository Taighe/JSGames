Match = function(plate1, plate2)
{
	this.plate1 = plate1;
	this.plate2 = plate2;
}

Grid = function ()
{
	var game = Brain.game;
	this.scoreBonus = 4500;
	this.scoreMulti = 3;
	this.exercise = null;
	this.group = game.add.group();
	this.icons = ["i5", "i1", "i2", "i3", "i4", "i6", "i7", "i8", "i9", "i10", "i11", "i12"];
	this.matches = null;
	this.maxMatches = 1;
	this.attempts = null;
	this.plates = [];
	this.currentMatch = [];
	this.plate1 = null;
	this.plate2 = null;
	this.spacing = new Vector(5, 5);
	this.note = 0;
	this.s_win = Brain.game.add.audio("s_win");
};

Grid.prototype.GetBonusScore = function()
{
	var remaining = this.exercise.duration - this.exercise.timer.seconds
	var timeBonus = 100 * remaining
	return parseInt(timeBonus);
}

Grid.prototype.Create = function(exercise, x, y, difficulty)
{
	var game = Brain.game;
	this.exercise = exercise;
	this.matches = 0;
	this.group.removeAll(true);
	this.attempts = 0;
	this.maxMatches = difficulty + 1;
	this.scoreMulti = difficulty;
	if(difficulty == 4)
	{
		this.maxMatches = difficulty + 2;
	}
	else if(difficulty == 5)
	{
		this.maxMatches = difficulty + 3;
	}
	else if(difficulty == 6)
	{
		this.maxMatches = difficulty + 4;
	}
	else if(difficulty == 7)
	{
		this.maxMatches = difficulty + 5;
	}

	var size = this.maxMatches * 2;
	var index = 0;
	var iconIndex = -1;
	var sizeX = size / 2;
	var sizeY = sizeX / 2;
	sizeY = MinMax(sizeY, 2, 6);
	sizeX = MinMax(sizeX, 2, 4);
	for(row = 0; row < sizeY; row++)
	{
		for(col = 0; col < sizeX; col++)
		{
			var plate = this.plates[index] = new Plate();
			console.log(index % 2 == 0);
			if(index % 2 == 0)
			{
				iconIndex += 1;
			}
			console.log(iconIndex);

			plate.Create(this.exercise, 0, 0, iconIndex, this.icons, this);
			var posX = x + (plate.sprite.x + plate.sprite.width + 10) * col; 
			var posY = y + (plate.sprite.y + plate.sprite.height+ 10) * row;
			plate.SetPosition(new Vector(posX, posY) );
			this.group.add(plate.group);

			index++; 
		}
	}

	this.group.centerX = game.width / 2;
	this.group.centerY = game.height / 2;
}

Grid.prototype.Init = function()
{		
	var game = Brain.game;
	this.note = 0;
	var idCopy = [];
	for(i = 0 ; i < this.plates.length; i++)
	{
		idCopy[i] = this.plates[i].id;
	}
	
	idCopy= Shuffle(idCopy, game);
	console.log(idCopy);
	for(i = 0 ; i < this.plates.length; i++)
	{
		var id = idCopy[i];
		this.plates[i].ChangeId(id);
	}

}

Grid.prototype.CheckMatch = function()
{
	var game = Brain.game; 
	if(this.currentMatch.length == 2)
	{
		var timer = game.time.create(true);
		this.attempts++;
		if(this.currentMatch[0].id == this.currentMatch[1].id)
		{
			console.log("yay a match");
			this.exercise.score += this.CalculateScore()
			var plate1 = this.currentMatch[0].GetPosition();
			var plate2 = this.currentMatch[1].GetPosition();
			this.group.add(ParticleBurst(plate1, "icon-correct", game, 0.4, 0.8, Color.green));
			this.group.add(ParticleBurst(plate2, "icon-correct", game, 0.4, 0.8, Color.green));
			this.currentMatch = [];
			this.matches++;
			if(this.matches >= this.maxMatches)
			{
				this.exercise.correct
				this.exercise.LevelEnd();
			}
			this.note++;
			this.exercise.DisplayMatch();
			this.s_win.play()
			return true;
		}
		else
		{
			timer.add(0.2 * 1000, this.currentMatch[0].Reset, this.currentMatch[0]);
			timer.add(0.4 * 1000, this.currentMatch[1].Reset, this.currentMatch[1]);
			timer.start();
			this.exercise.s_lose.play();
			this.currentMatch = [];
			console.log("wrong");
			return false;
		}
	}

	return false;
}

Grid.prototype.CalculateScore = function()
{
	var game = Brain.game;
	var score = 100 * this.exercise.level
	return score
}

Grid.prototype.Update = function()
{
	var game = Brain.game;

}

Grid.prototype.Free = function()
{
	console.log("Memory Free");
	this.group.destroy();
}
