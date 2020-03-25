function Grid(exercise, x, y)
{
	var game = Brain.game;
	this.exercise = exercise;
	this.letters = [];
	this.scoreBonus = 200;
	var wordArray = ["JOY", "GLAD", "RAPT", "CALM", "LOVE", "HOPE", "KEEN"]
	var wordArray2 = ["HAPPY", "BLISS", "PROUD", "EAGER", "PEACE", "BRAVE"];
	var wordArray3 = ["JOYOUS", "AMUSED", "ELATED", "THRILL", "SERENE", "DESIRE", "TENDER"]
	var wordArray4 = ["JOYOUS", "AMUSED", "ELATED", "THRILL", "SERENE", "DESIRE", "TENDER", "JOY", "GLAD", "RAPT", "CALM", "LOVE", "HOPE", "KEEN","HAPPY", "BLISS", "PROUD", "EAGER", "PEACE", "BRAVE" ]
	this.lastWord = null
	this.levels = [wordArray, wordArray2, wordArray3, wordArray4];
	this.wordAddress = [];
	this.letterPool = [];
	this.word = "FREE";
	this.currentNode = null;
	this.previousNode = null;
	this.pathNodes = [];
	this.size = 5;
}

Grid.prototype.Init = function()
{
	var game = Brain.game;
	this.group = game.add.group();	
	this.group.inputEnableChildren = true;
	var level = this.exercise.level - 1;
	level = MinMax(level, 0, 3);
	var array = this.levels[level];
	array = Shuffle(array, game) 
	this.word = array[GetRandomInt(0, array.length)];
	while(this.word == this.lastWord)
		this.word = array[GetRandomInt(0, array.length)];

	this.lastWord = this.word
	this.wordAddress = [];
	this.currentNode = null;
	this.previousNode = null;
	this.size = 4 + this.exercise.level;
	this.size = MinMax(this.size, 4, 7);

	for(col = 0; col < this.size; col++)
	{
		this.letters[col] = new Array(this.size)
		for(row = 0; row < this.size; row++)
		{
			var rand = GetRandomInt(0, CharArray.chars.length - 1);
			var char = CharArray.chars[rand];
			this.letters[col][row] = new Letter(this.exercise, char, 70 * col, 70 * row, new Vector(col, row), this);
			this.group.add(this.letters[col][row].group);	
		}
	}

	var rand = GetRandomInt(0, 5);
	if(rand >= 0 && rand <= 1)
	{
		this.InsertVertical();
	}
	else if(rand >= 2 && rand <= 3)
	{
		this.InsertHorizontal();
	}
	else if(rand == 4)
	{
		this.InsertDiagnonal();
	}

	this.group.centerX = game.width / 2;
	this.group.centerY = game.height /2;

	this.info = Brain.AddText("", 0, 0, Color.lightGray, 32, 0.5, 0.5, "normal", 500, "LatoRegular");
	this.info.text = "FIND THE WORD " + this.word;
	this.info.addColor(Color.purple, 14);
	this.info.centerX = this.group.width / 2
	this.info.centerY = -100;
	this.Intro();
	this.group.add(this.info);

}

Grid.prototype.Intro = function()
{
	var game = Brain.game;
	var timer = game.time.create(true);
	var index = 0;
	for(col = 0; col < this.size; col++)
	{
		for(row = 0; row < this.size; row++)
		{
			timer.add(index * 1000, this.letters[col][row].Init, this.letters[col][row]);
			index += 0.01;
		}
	}
	timer.start();
}

Grid.prototype.InsertHorizontal = function()
{
	var sizeX = this.size;
	var randCol = GetRandomInt(0, sizeX - this.word.length +1);
	console.log(sizeX - this.word.length );
	var sizeY = this.size;
	var randRow = GetRandomInt(0, sizeY) ;

	for(col = 0; col < this.word.length; col++)
	{
		this.letters[randCol + col][randRow].ChangeLetter(this.word[col]);
		this.wordAddress.push(this.letters[randCol + col][randRow]);
	}
}

Grid.prototype.InsertDiagnonal = function()
{
	var randCol = GetRandomInt(0, this.size);
	var sizeY = this.size;
	var randRow = GetRandomInt(0, sizeY - this.word.length +1);
	console.log(sizeY - this.word.length);
	for(row = 0; row < this.word.length; row++)
	{
		this.letters[row][row].ChangeLetter(this.word[row]);	
		this.wordAddress.push(this.letters[row][row]);
	}
}

Grid.prototype.InsertVertical = function()
{
	var randCol = GetRandomInt(0, this.size);
	var sizeY = this.size;
	var randRow = GetRandomInt(0, sizeY - this.word.length +1);
	console.log(sizeY - this.word.length);
	for(row = 0; row < this.word.length; row++)
	{
		this.letters[randCol][randRow + row].ChangeLetter(this.word[row]);	
		this.wordAddress.push(this.letters[randCol][randRow + row]);
	}
}

Grid.prototype.CheckWord = function()
{
	var allSelected = function(element, index, array)
	{
		element.correctWord = true;
		return element.selected == true;
	}

	if(this.wordAddress.every(allSelected) && this.exercise.gameReady == true)
	{
		this.Win();
	}
}

Grid.prototype.RevealWord = function()
{
	for(col = 0; col < this.size; col++)
	{
		for(row = 0; row < this.size; row++)
		{
			this.letters[col][row].Hide()
		}
	}

	for(i=0; i < this.wordAddress.length; i++)
	{
		this.wordAddress[i].Reveal()
	}
}

Grid.prototype.Win = function()
{
	console.log("Yay!");
	for(col = 0; col < this.size; col++)
	{
		for(row = 0; row < this.size; row++)
		{
			this.letters[col][row].Hide()
		}
	}
	
	for(i=0; i < this.wordAddress.length; i++)
	{
		this.wordAddress[i].Correct();
		var nextletter = this.wordAddress[i+1];
		this.wordAddress[i].Link(nextletter);
	}
	this.exercise.correct = true;
	this.exercise.score += this.scoreBonus * this.exercise.level;
	this.exercise.LevelEnd();
}

Grid.prototype.Free = function()
{
	if(this.group != null)
		this.group.destroy();
}