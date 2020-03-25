function Letter(exercise, char, x, y, address, grid)
{
	var game = Brain.game;
	this.exercise = exercise;
	this.grid = grid;
	this.correctWord = false;
	this.selected = false;
	this.address = address;
	this.group = game.add.group();
	this.group.inputEnableChildren = true;
	this.sprite = Brain.AddSprite("circle", x, y, 0, 0, 0.5, 0.5);
	this.char = Brain.AddText(char, x, y, Color.gray, 1, 0.5, 0.5, "normal", 500, "LatoRegular");
	this.char.centerX = this.sprite.centerX;
	this.char.centerY = this.sprite.centerY;
	this.pulseSprite = new Brain.AddSprite("pulse", x, y, 0, 0, 0.5, 0.5);
	this.pulseSprite.alpha = 0.6;
	this.pulseSprite.tint = Color.grayHex;
	this.link = null;
	this.x = this.sprite.centerX;
	this.y = this.sprite.centerY;
	this.sprite.events.onInputDown.add(this.Select, this);
	this.sprite.events.onInputOver.add(this.Select, this);
	this.group.add(this.sprite);
	this.group.add(this.char);
	this.group.add(this.pulseSprite);
	this.pulseSprite.inputEnabled = false;
	this.char.inputEnabled = false;

	console.log("letter made");
}

Letter.prototype.constructor = Letter;

Letter.prototype.Init = function()
{
	var game = Brain.game;
	console.log("intro");

	this.char.fontSize = 1;
	var spriteT = game.add.tween(this.sprite);
	spriteT.to({width: 60, height: 60}, 0.5 * 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
    var charT = game.add.tween(this.char);
    charT.to({fontSize: 32}, 0.5 * 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false);
}

Letter.prototype.ChangeLetter = function(char)
{
	this.char.text = char;
}

Letter.prototype.Select = function()
{
	var game = Brain.game;

	this.selected = !this.selected;
	if(this.correctWord == true)
		this.selected = true
	this.pulseSprite.alpha = 0.6;
	this.pulseSprite.width = 0;
	this.pulseSprite.height = 0;
	this.sprite.alpha = 1;

	var pulse = Brain.TweenScale(this.pulseSprite, 100, 100, false, 0.5, 1);
	var fade = Brain.TweenFade(this.sprite, 0, false, 0.1);
	var fadePulse = Brain.TweenFade(this.pulseSprite, 0, false, 0.5, 1);
	
	if(this.selected == true)
	{	
		fade.yoyo(true);
		pulse.start();
		fadePulse.start();
		fade.start();
		this.sprite.tint = Color.purpleHex;
		this.char.addColor(Color.white, 0);
		this.grid.CheckWord();
	}
	else
	{
		this.sprite.tint = Color.whiteHex;
		this.char.addColor(Color.gray, 0);
	}
}

Letter.prototype.Hide = function()
{
	this.sprite.tint = Color.whiteHex;
	this.char.addColor(Color.gray, 0);
}

Letter.prototype.Reveal = function()
{
	var pulse = Brain.TweenScale(this.pulseSprite, 100, 100, false, 0.5, 1);
	var fade = Brain.TweenFade(this.sprite, 0, false, 0.1);
	var fadePulse = Brain.TweenFade(this.pulseSprite, 0, false, 0.5, 1);

	fade.yoyo(true);
	pulse.start();
	fadePulse.start();
	fade.start();
	this.sprite.tint = Color.purpleHex;
	this.char.addColor(Color.white, 0);
} 

Letter.prototype.Link = function(letter)
{
	var game = Brain.game;
	try
	{
		var otherLetter = letter;
		this.link = game.add.graphics(0, 0);
		this.link.beginFill(Color.greenHex);
		this.link.lineStyle(10, Color.greenHex, 1);
		this.link.moveTo(this.sprite.centerX, this.sprite.centerY);
		this.link.lineTo(otherLetter.sprite.centerX, otherLetter.sprite.centerY);
		this.link.endFill();
		this.grid.group.add(this.link);
		this.grid.group.sendToBack(this.link);
		return;
	}
	catch(err)
	{
		console.log(err);
		return;
	}

}

Letter.prototype.Correct = function()
{
	var game = Brain.game;
	this.sprite.tint = Color.greenHex;
	this.char.addColor(Color.white, 0);
	var burst = ParticleBurst(new Vector(this.sprite.centerX, this.sprite.centerY), "star-green", game, 0.01, 0.05, Color.greenHex);
	this.group.add(burst);
}

Letter.prototype.Free = function()
{
	this.sprite.destroy();
	this.pulseSprite.destroy();
	return this;
}