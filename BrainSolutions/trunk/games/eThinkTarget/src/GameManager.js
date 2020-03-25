GameManager = function (exercise)
{
	var game = Brain.game;
	console.log("created");
	this.exercise = exercise;
	Phaser.Group.call(this, game);
	this.back = Brain.AddSprite("background", game.width *0.5, game.height *0.5, game.width, game.height, 0.5, 0.5, false)
	this.target = new Target(exercise, game.width * 0.5, game.height * 0.58 );
	this.bow = new Bow(exercise, this, game.width * 0.5, game.height * 0.5);

	this.bow.visible = false;
	this.bow.arrow.visible = false
	this.centerX = game.width * 0.5
	this.centerY = game.height * 0.5
	this.distance = 5
	this.distanceText = Brain.AddText("DISTANCE", game.width * 0.2, game.height * 0.95, Color.white, 26, 0.5, 0.5, "normal", 800, "LatoRegular");
	var graphics = new Phaser.Graphics(game, 0,0);
	graphics.lineStyle(10, Color.whiteHex, 1);
	graphics.lineTo(game.width * 0.5, 0 )
	var windBackTexture = graphics.generateTexture()
	this.windBack = Brain.AddSprite(windBackTexture, game.width *0.87, game.height *0.95, 110, 4, 0.5, 0.5, false)
	this.wind = Brain.AddText("WIND", game.width * 0.7, game.height * 0.95, Color.white, 26, 0.5, 0.5, "normal", 800, "LatoRegular");
	this.windStrength = new Phaser.Graphics(game, 0, 0);
	this.windStrength.beginFill(Color.whiteHex)
	this.windStrength.drawRoundedRect(0, 0, this.wSBarWidth, 35)
	this.windStrength.scale.set(0.5)
	this.windStrength.x = game.width * 0.78
	this.windStrength.y = game.height * 0.94
	this.windMax = 200
	this.windDirection = 50
	this.windIcon =Brain.AddSprite("windDirection", this.wind.left - 30, game.height *0.95, 35, 35, 0.5, 0.5, false)
	this.windValue = 1
	this.windMaxValue = 10
	game.add.existing(this.windStrength);
	game.add.existing(this);
	return this;
};

GameManager.prototype = Object.create(Phaser.Group.prototype);
GameManager.prototype.constructor = GameManager;

GameManager.prototype.Init = function(distance)
{		
	var game = Brain.game;
	this.target.Init(distance);
	var aimSpeed = 1 / (this.exercise.level * 0.3);
	this.bow.Init(this.target.tBottom, this.target.tTop, this.target.tLeft, this.target.tRight, aimSpeed);
	this.distanceText.text = "DISTANCE " + distance + "m";
	this.distanceText.addFontWeight("bold", 9);
	this.bow.visible = true;
	HudManager.scoreSprite.fill = Color.white
	this.windStrength.clear()
	this.windStrength.beginFill(Color.whiteHex)
	this.windValue = this.exercise.level + 2
	this.windDirection = 180
	if(GetRandomInt(0, 2) == 1)
		this.windDirection = 0

	this.windIcon.angle = this.windDirection
	var value = this.windMax * (this.windValue / 10)
	this.windStrength.drawRoundedRect(0, 0, value, 35)
	this.windStrength.scale.set(0.5)
	this.windStrength.x = game.width * 0.78
	this.windStrength.y = game.height * 0.94
}

GameManager.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
}

GameManager.prototype.Visible = function(visible)
{
	this.target.visible = visible;
	this.bow.visible = visible;
	this.bow.arrow.visible = visible
	this.distanceText.visible = visible;
	this.back.visible = visible;
}

GameManager.prototype.FiredEvent = function()
{
	this.exercise.timer.pause();
	console.log("fire")
	this.exercise.instructions[this.exercise.index].alpha = 0
	this.exercise.instructTimer.pause()
	this.target.FiredEvent();
	this.bow.visible = false;
}

GameManager.prototype.Free = function()
{
	console.log("Memory Free");
}