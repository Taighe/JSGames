TopMenu = function (manager, exercise)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.exercise = exercise;
	this.manager =manager;
	this.backB = new MenuItem(this.manager, game.width * 0.1, game.height * 0.1, this.Exit, this, "BACK", Color.whiteHex, Color.lightGrayHex, Color.gray, Color.lightGray, 100, 50, 15);
	this.backB.once= true;
	this.info = Brain.AddText("", Brain.centerX, game.height * 0.1, Color.black, 32, 0.5, 0.5, "normal", 900, "LatoRegular");
	this.info.align = "center";
	this.add(this.backB);
	this.add(this.info);
	this.bottom = 0;
	this.x = 0;
	game.add.existing(this);

	return this;
};

TopMenu.prototype = Object.create(Phaser.Group.prototype);
TopMenu.prototype.constructor = TopMenu;

TopMenu.prototype.Init = function()
{		
	var game = Brain.game;
	var tween = game.add.tween(this);
	tween.to({top: 15}, 0.5*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	this.info.text = "Customize the negative thought you selected";
	this.info.fontSize = 20
}

TopMenu.prototype.Hide = function()
{
	var game = Brain.game;
	var tween = game.add.tween(this);
	tween.to({bottom: 0}, 0.5*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
}

TopMenu.prototype.Exit = function()
{
	var game = Brain.game;
	this.manager.Init();
	this.Hide();
}

TopMenu.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS /1000;

}

TopMenu.prototype.Free = function()
{
	console.log("Memory Free");
}