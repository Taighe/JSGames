Button = function(text, key, textColor, color, lineColor, callback, context, x, y, width, height) 
{
    var game = Brain.game;
    Phaser.Group.call(this, game);

    this.button = new Phaser.Button(game, 0, 0, key, callback, context);
    this.text = new Phaser.Text(game, 0, 0, text);
    this.text.fill = textColor;
    this.text.fontSize = width * 0.2;
    this.text.anchor.set(0.5, 0.5);
    this.text.x = this.button.width * 0.5;
    this.text.y = this.button.height * 0.5;
    this.add(this.button);
    this.add(this.text);
    this.centerX = x;
    this.centerY = y;
    game.add.existing(this)
    return this;
};

Button.prototype = Object.create(Phaser.Group.prototype);
Button.prototype.constructor = Button;

Button.prototype.SetFontSize = function(size)
{
	this.text.fontSize = size;
}

Button.prototype.Enable = function(enable)
{
	this.button.inputEnabled = enable;
	this.alpha = 0.5;
	
	if(enable == true)
	{
		this.alpha = 1;
	}
}