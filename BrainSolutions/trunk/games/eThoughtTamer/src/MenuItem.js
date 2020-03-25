MenuItem = function ( manager, x, y, callback, context, text, downColor, upColor, textDownColor, textUpColor, width, height, fontSize, circle)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.textDownColor = textDownColor
	this.textUpColor = textUpColor
	this.manager = manager;
	
	this.fill = new Phaser.Graphics(game, 0, 0);
	this.fill.beginFill(downColor);
	this.fill.drawRoundedRect(0, 0, width, height, 15);
	this.fill.alpha = 0;

	this.outline = new Phaser.Graphics(game, 0, 0);
	this.outline.lineStyle(1, upColor, 1);
	this.outline.drawRoundedRect(0, 0, width, height, 15);
	this.button = new Phaser.Button(game, 0, 0, "", callback, context);
	this.button.width = width;
	this.button.height = height

	this.button.onInputOver.add(this.OnOver, this);
	this.button.onInputOut.add(this.OnOut, this);
	this.button.onInputDown.add(this.OnDown, this);

	this.text = new Phaser.Text(game, this.button.x, this.button.y, text);
	this.text.anchor.set(0.5, 0.5);
	this.text.centerX = this.button.width * 0.5;
	this.text.centerY = this.button.height * 0.5;
	this.text.align = "center";
	this.text.weight = "normal";
    this.text.fontSize = fontSize;
    this.text.fill = textUpColor;
    this.over = false;
    this.once = false;
    this.add(this.fill);
    this.add(this.outline);
	this.add(this.button);
	this.add(this.text);
	this.centerX = x;
	this.centerY = y
	game.add.existing(this);
	return this;
};

MenuItem.prototype = Object.create(Phaser.Group.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.update = function()
{

	if(this.manager.selected == this)
	{
		this.fill.alpha = 1;
		this.text.fill = this.textDownColor;
	}
	else
	{
		this.fill.alpha = 0;
		this.text.fill = this.textUpColor;
	}
}

MenuItem.prototype.Enable = function(enable)
{
	var game = Brain.game;
	if(enable == false)
	{
		this.button.visible= false
		this.text.alpha = 0.2
	}
	else
	{
		this.button.visible= true
		this.text.alpha = 1
	}
}

MenuItem.prototype.OnDown = function()
{
	var game = Brain.game;
	this.manager.selected = this;
	this.fill.alpha = 1;
	this.text.fill = this.textDownColor;
	this.manager.index = parseInt(this.text.text)
}

MenuItem.prototype.OnOver = function()
{
	var game = Brain.game;

	this.over = true;
	this.fill.alpha = 1;
	this.text.fill = this.textDownColor;
}

MenuItem.prototype.OnOut = function()
{
	var game = Brain.game;
	
	this.over = false;
	this.fill.alpha = 0;
	this.text.fill = this.textUpColor;
}

MenuItem.prototype.Free = function()
{
	console.log("Memory Free");
}