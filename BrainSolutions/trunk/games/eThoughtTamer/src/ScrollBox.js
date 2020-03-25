ScrollBox = function (manager, exercise, x, y, array, slider, callback, context)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.exercise = exercise;
	this.callback = callback;
	this.context = context;
	this.manager =manager;
	this.size = new Vector(300, 400);
	this.sliderEnable = slider;
	var graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.lightGrayHex);
	graphics.lineStyle(1, Color.blackHex, 1);
	graphics.drawRoundedRect(0, 0, this.size.x, this.size.y, 1);
	var back = graphics.generateTexture();

	graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.grayHex);
	graphics.drawRoundedRect(0, 0, 25, 100, 4);
	var slider = graphics.generateTexture();

	graphics = new Phaser.Graphics(game, 0, 0);
	graphics.lineStyle(2, Color.blackHex, 1)
	graphics.lineTo(this.size.x, 0);
	var gridLine = graphics.generateTexture();

	this.background = new Phaser.Sprite(game, 0, 0, back);
	this.slider = new Phaser.Sprite(game, 100, 0, slider);
	this.slider.inputEnabled =true;
	this.slider.input.enableDrag();
	this.container = new Phaser.Sprite(game, 0, 0);
	for(i=0; i < array.length;i++)
	{
		var feeling = array[i];
		var text = new Phaser.Text(game, 15, 50 * i, feeling)

		var line = new Phaser.Sprite(game, -15, 35, gridLine);
		line.visible = false;
		if(this.sliderEnable == false)
		{
			text.fontSize = 18;
			line.visible = true;
		}
		text.addChild(line);
		text.inputEnabled = true;
		text.events.onInputDown.add(this.Selected, this, feeling);
		this.container.addChild(text);
	}
	var mask = new Phaser.Graphics(game, 0, 0);
	mask.beginFill(Color.black);
	mask.drawRect(0, 190, this.size.x + 200, this.size.y - 5);
	this.container.mask = mask;
	this.title = new Brain.AddText("How does this thought make you feel?", -50, -45, Color.black, 21, 0, 0.5, "bold", 500, "LatoRegular");
	this.add(this.background);
	this.add(this.container);
	this.add(this.slider);
	this.add(this.title);
	this.slider.visible = this.sliderEnable;
	this.centerX = x;
	this.centerY = y;
	return this;
};

ScrollBox.prototype = Object.create(Phaser.Group.prototype);
ScrollBox.prototype.constructor = ScrollBox;

ScrollBox.prototype.Init = function(text)
{		
	var game = Brain.game;
	this.visible =false;
	this.title.text = text;
	this.slider.visible = this.sliderEnable;
	if(this.sliderEnable == false)
	{
		this.background.height = this.container.children.length * 47.5;
	}	
}

ScrollBox.prototype.Display = function(visible)
{
	this.visible = visible;
	this.slider.visible = this.sliderEnable;
}

ScrollBox.prototype.Selected = function(feeling)
{
	var game = Brain.game;

	this.manager.feeling = feeling.text;
	var signal = new Phaser.Signal();
	signal.add(this.callback, this.context);
	signal.dispatch();
	console.log(this.callback);
}

ScrollBox.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS /1000;

	this.slider.x = MinMax(this.slider.x, this.size.x - 25, this.size.x - 25);
	this.slider.y = MinMax(this.slider.y, 0, this.size.y - 100);
	var percent = this.slider.y / this.size.y;
	this.container.y = percent * -this.container.children.length * 60;
}

ScrollBox.prototype.Free = function()
{
	console.log("Memory Free");
}