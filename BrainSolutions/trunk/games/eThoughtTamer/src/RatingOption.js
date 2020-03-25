RatingOption = function ( text, x, y)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.index = 3;
	this.message = Brain.AddText(text, 0, -100, Color.black, 40, 0.5, 0.5, "normal", 800, "LatoRegular")
	this.less = Brain.AddText("LESS", -325, 15, Color.lightGray, 25, 0.5, 0.5, "normal", 800, "LatoRegular")
	this.more = Brain.AddText("MORE", 325, 85, Color.lightGray, 25, 0.5, 0.5, "normal", 800, "LatoRegular")

	this.group = game.add.group()
	this.group.inputEnableChildren = true
	for(i=0; i < 5;i++)
	{
		var button = new MenuItem( this, 0, 0, null, this, i+1, Color.lightPurpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 80, 80, 25);
		this.group.add(button)
		button.centerX = i * 100;
	}
	for(i=0; i < 5;i++)
	{
		var button = new MenuItem( this, 0, 100, null, this, i+6, Color.lightPurpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 80, 80, 25);
		this.group.add(button)
		button.centerX = 45 + i * 100;
	}

	this.add(this.message)
	this.add(this.less)
	this.add(this.more)
	this.add(this.group)
	this.selected = this.group.children[2];
	this.group.centerX =0
	this.group.centerY =50
	this.centerX = x;
	this.centerY = y;
	return this;
};

RatingOption.prototype = Object.create(Phaser.Group.prototype);
RatingOption.prototype.constructor = RatingOption;

RatingOption.prototype.Init = function()
{		
	var game = Brain.game;
	this.visible =false;
}

RatingOption.prototype.Display = function(visible)
{
	this.visible = visible;
}

RatingOption.prototype.update = function()
{
	var game = Brain.game;
	this.group.callAll("update", null)
}

RatingOption.prototype.GetValue = function()
{
	var game = Brain.game;
	return this.index;
}

RatingOption.prototype.Free = function()
{
	console.log("Memory Free");
}