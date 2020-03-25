Option = function (manager, text, x, y)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.button = new Phaser.Button(game, 0, 0, "option", this.OnDown, this, 1, 0, 1, 1);
	this.button.anchor.set(0.5, 0.5);
	this.manager = manager;
	this.answer = Brain.AddText(text, 0, 0, Color.lightPurple, 25, 0.5, 0.5, "normal", 800, "LatoRegular");
	this.answer.inputEnabled = true
	this.answer.events.onInputDown.add(this.OnDown, this)
	this.answer.text = text;
	this.answer.left = this.right + 35;
	this.add(this.button);
	this.add(this.answer);
	this.left = x;
	this.enabled = true;
	game.add.existing(this);
	return this;
};

Option.prototype = Object.create(Phaser.Group.prototype);
Option.prototype.constructor = Option;

Option.prototype.OnDown = function()
{
	this.button.frame = 1;
	if(this.enabled == true)
	{
		this.manager.CheckAnswer(this.answer.text);
	}

}

Option.prototype.Disabled = function()
{
	this.enabled = false;
	this.alpha = 0.1;
	this.button.input.enabled = false;
	this.answer.input.enabled = false;
}