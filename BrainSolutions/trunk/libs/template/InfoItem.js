InfoItem = function ( manager, x, y, callback, context, text, downColor, upColor, textDownColor, textUpColor, width, height, fontSize, circle)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.textDownColor = textDownColor
	this.textUpColor = textUpColor
	this.manager = manager;
	this.fill = new Phaser.Graphics(game, 0, 0);
	this.outline = new Phaser.Graphics(game, 0, 0);
	if(circle == undefined)
	{
		this.fill.beginFill(downColor);
		this.fill.drawRoundedRect(0, 0, width, height, 15);
		this.fill.alpha = 0;

		this.outline.lineStyle(1, upColor, 1);
		this.outline.drawRoundedRect(0, 0, width, height, 15);
	}
	else
	{
		this.fill.beginFill(downColor);
		this.fill.drawCircle(width * 0.5, height * 0.5, width);
		this.fill.alpha = 0;

		this.outline.lineStyle(1, upColor, 1);
		this.outline.drawCircle(width * 0.5, height * 0.5, width);
	}
	this.button = new Phaser.Button(game, 0, 0, "", callback, context);
	this.button.width = width;
	this.button.height = height

	this.button.onInputOver.add(this.OnOver, this);
	this.button.onInputOut.add(this.OnOut, this);
	this.button.onInputDown.add(this.OnDown, this);
	this.button.onInputUp.add(this.OnUp, this);

	this.text = Brain.AddText(text, 0, 0, textUpColor, fontSize, 0.5, 0.5, "", 900, "LatoRegular")
	this.text.centerX = this.button.centerX
	this.text.centerY = this.button.centerY
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

InfoItem.prototype = Object.create(Phaser.Group.prototype);
InfoItem.prototype.constructor = InfoItem;

InfoItem.prototype.update = function()
{

}

InfoItem.prototype.OnDown = function()
{
	var game = Brain.game;
	this.manager.selected = this;
	this.fill.alpha = 1;
	this.text.fill = this.textDownColor;
	this.manager.index = parseInt(this.text.text)
}

InfoItem.prototype.OnOver = function()
{
	var game = Brain.game;

	this.over = true;
	this.fill.alpha = 1;
	this.text.fill = this.textDownColor;
}

InfoItem.prototype.OnOut = function()
{
	var game = Brain.game;
	
	this.over = false;
	this.fill.alpha = 0;
	this.text.fill = this.textUpColor;

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

InfoItem.prototype.OnUp = function()
{
	var game = Brain.game;

	this.fill.alpha = 0;
	this.text.fill = this.textUpColor;
}

InfoItem.prototype.Free = function()
{
	console.log("Memory Free");
}