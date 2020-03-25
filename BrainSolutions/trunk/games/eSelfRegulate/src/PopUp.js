function PopUp(x, y, title, body, feeling)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	var graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.lightPurpleHex);

	graphics.drawRoundedRect(0, 0, 400, 400);
	var background = graphics.generateTexture();
    this.button = new Phaser.Sprite(game, 0, 0, background);
    this.button.anchor.set(0.5, 0.5);
    this.button.alpha = 0.9;
    this.title = Brain.AddText(title, this.button.centerX, this.button.top + 35, Color.white, 32, 0.5, 0.5, "bold", 800, "LatoRegular");
    this.body = Brain.AddText(body, this.button.centerX, this.button.centerY - 25, Color.white, 25, 0.5, 0.5, "normal", 400, "LatoRegular");
    this.body.align = "center";
    this.feeling = Brain.AddText(feeling, this.button.centerX, this.button.bottom - 125, Color.white, 45, 0.5, 0.5, "bold", 800, "LatoRegular");
    this.feeling.align = "center";
    this.close = new GenericButton("CLOSE", this.button.centerX - 50, this.button.bottom - 70, this.Dismiss, this, 100, 50);
    this.add(this.button);
    this.add(this.title);
    this.add(this.body);
    this.add(this.feeling);
    this.add(this.close);
    this.centerX = x;
    this.centerY = y;
    game.add.existing(this);
}

PopUp.prototype = Object.create(Phaser.Group.prototype);
PopUp.prototype.constructor = PopUp;
PopUp.prototype.Dismiss = function()
{
	this.visible =false;
}
