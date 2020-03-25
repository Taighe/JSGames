MenuItem = function ( manager, x, y, callback, context, text, downColor, upColor, textDownColor, textUpColor, width, height, fontSize, args)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.callback = callback
	this.context  =context
	this.args = null
	if(args != undefined)
	{
		this.args = args
	}
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
	this.button = new Phaser.Button(game, 0, 0, "", this.Clicked, this);
	this.button.width = width;
	this.button.height = height

	this.button.onInputOver.add(this.OnOver, this);
	this.button.onInputOut.add(this.OnOut, this);
	this.button.onInputDown.add(this.OnDown, this);
	this.button.onInputUp.add(this.OnUp, this);
	this.text = Brain.AddText(text, 0, 0, textUpColor, fontSize, 0.5, 0.5, "normal", 900, "LatoRegular");
	this.text.centerX = this.button.width * 0.5;
	this.text.centerY = this.button.height * 0.5;
	this.text.align = "center";

    this.over = false;
    this.once  =false;
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
	if(this.once)
		return;

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

MenuItem.prototype.OnDown = function()
{
	var game = Brain.game;
	this.manager.selected = this;
	this.fill.alpha = 1;
	this.text.fill = this.textDownColor;
	this.manager.index = parseInt(this.text.text)
}

MenuItem.prototype.Clicked = function()
{
	var game = Brain.game;
    var signal = new Phaser.Signal()
    signal.add(this.callback, this.context);
    signal.dispatch(this.args);
}

MenuItem.prototype.OnOver = function()
{
	var game = Brain.game;
	if(this.manager.selected == this)
		return;

	this.over = true;
	this.fill.alpha = 1;
	this.text.fill = this.textDownColor;
}

MenuItem.prototype.OnUp = function()
{
	var game = Brain.game;

	this.fill.alpha = 0;
	this.text.fill = this.textUpColor;
}

MenuItem.prototype.OnOut = function()
{
	var game = Brain.game;
	if(this.manager.selected == this)
		return;
	
	this.over = false;
	this.fill.alpha = 0;
	this.text.fill = this.textUpColor;
}

MenuItem.prototype.Free = function()
{
	console.log("Memory Free");
}