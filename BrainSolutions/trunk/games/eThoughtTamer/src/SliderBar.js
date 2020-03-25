SliderBar = function (manager, exercise, x, y)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.exercise = exercise;
	this.manager =manager;
	this.size = new Vector(300, 5);
	this.index = 5;

	var graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.lightGrayHex);
	graphics.lineStyle(1, Color.blackHex, 1);
	graphics.drawRoundedRect(0, 0, this.size.x, this.size.y, 1);
	var back = graphics.generateTexture();

	graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.grayHex);
	graphics.drawRoundedRect(0, 0, 25, 25, 4);
	var slider = graphics.generateTexture();
	
	graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.blackHex);
	graphics.drawRoundedRect(0, 0, 1, 5, 4);
	var mark = graphics.generateTexture();

	this.background = new Phaser.Sprite(game, 0, 100, back);
	this.slider = new Phaser.Sprite(game, 100, 0, slider);
	this.slider.anchor.set(0.5, 0.5);
	this.slider.inputEnabled =true;
	this.slider.input.enableDrag();
	this.container = new Phaser.Sprite(game, 0, 0);
	for(i=0; i < 10;i++)
	{
		this.container.addChild(new Phaser.Sprite(game, i * 325 / 10, 80, mark));
	}
	this.markSpacing = 325 / 10;

	this.title = new Brain.AddText("You indicated that your feeling is " + this.manager.feeling + "." + "How strong is this feeling?", -50, -15, Color.black, 21, 0, 0.5, "bold", 400, "LatoRegular");
	this.add(this.background);
	this.add(this.container);
	this.add(this.slider);
	this.add(this.title);

	this.centerX = x;
	this.centerY = y;
	return this;
};

SliderBar.prototype = Object.create(Phaser.Group.prototype);
SliderBar.prototype.constructor = SliderBar;

SliderBar.prototype.Init = function()
{		
	var game = Brain.game;
	this.visible =false;
	this.title.text  ="You indicated that your feeling is " + this.manager.feeling + "." + " How strong is this feeling?";
}

SliderBar.prototype.Display = function(visible)
{
	this.visible = visible;
}

SliderBar.prototype.Update = function()
{
	var game = Brain.game;
	if(this.slider.x > this.index * this.markSpacing)
	{
		this.index++;
	}
	else if(this.slider.x < this.index * this.markSpacing - 25)
	{
		this.index--
	}
	this.slider.y = MinMax(this.slider.y, 100, 100);
	this.slider.x = this.index  *this.markSpacing;
	this.slider.x = MinMax(this.slider.x, 0, 290);
}

SliderBar.prototype.Free = function()
{
	console.log("Memory Free");
}