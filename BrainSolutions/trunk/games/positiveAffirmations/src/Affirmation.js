Affirmation = function(x, y, width, height, callback, context, text) 
{
    var game = Brain.game;

	this.callback = callback;
    this.context = context;
    var graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.yellowHex);
	graphics.drawRect(0, 0, width, height);
	var background = graphics.generateTexture();
    this.edited = false
    graphics = new Phaser.Graphics(game, 0, 0);
    graphics.beginFill(Color.blackHex);
    graphics.drawRoundedRect(0, 0, width + 8, height + 8, 10);
    var shadow = graphics.generateTexture();

    Phaser.Group.call(this, game);
    this.background = new Phaser.Sprite(game, 0, 0, background);
    this.background.anchor.set(0.5, 0.5)
    this.shadow = new Phaser.Sprite(game, 5, 5, shadow);
    this.shadow.anchor.set(0.5, 0.5)
    this.shadow.alpha = 0.2;
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.Clicked, this);
    this.word = Brain.AddText(text, 0, 0, Color.black, 24, 0.5, 0.5, "normal", 280, "LatoRegular");
    this.word.align = "center"
    this.word.anchor.set(0.5, 0.5);
    this.word.fill = Color.black;
    this.word.fontSize = 28;
    this.date = Brain.AddText("", 0, 0, Color.gray, 24, 0, 0.5, "normal", 600, "LatoRegular");
    this.date.align = "center"
    this.background.inputEnabled = true;
    this.word.x = this.background.centerX;
    this.word.y = this.background.centerY - 15;
    this.date.x = this.background.left + 25;
    this.date.y = this.background.bottom - 25;
    this.add(this.shadow);
    this.add(this.background);
    this.add(this.word);
    this.add(this.date)
    this.centerX = x;
    this.centerY = y;
    this.editMode = false
    game.add.existing(this)
    return this;
};

Affirmation.prototype = Object.create(Phaser.Group.prototype);
Affirmation.prototype.constructor = Affirmation;

Affirmation.prototype.SetSize = function(size)
{
    this.scale.set(size);
}

Affirmation.prototype.update = function()
{
    var game = Brain.game
    if(this.editMode)
    {
        var doc = document.getElementById("hiddenInput");
        this.word.text = doc.value
    }
    scroll(0,0)
}

Affirmation.prototype.SelectMode = function(enable)
{
    this.editMode = false
    this.background.inputEnabled = true;
    this.background.events.onInputDown.removeAll()
    if(enable)
    {      
        this.background.events.onInputDown.add(this.Clicked, this);     
    }
    else
    {
        this.background.events.onInputDown.removeAll()
    }
}

Affirmation.prototype.SetEditMode = function(text)
{
    this.background.events.onInputDown.add(this.Edit, this);
    this.background.inputEnabled = true;
    this.date.text = Brain.Date

}

Affirmation.prototype.Clicked = function()
{
    var signal = new Phaser.Signal()
    signal.add(this.callback, this.context);
    signal.dispatch(this);
    var doc = document.getElementById("hiddenInput");
    doc.value = ""
}

Affirmation.prototype.Edit = function()
{
    console.log("keyboard Go!");
    var game = Brain.game
    this.editMode = !this.editMode
    document.getElementById("hiddenInput").focus();
    scroll(0, 0)

}

Affirmation.prototype.Over = function()
{
}

Affirmation.prototype.Visible = function(visible)
{
    var game = Brain.game
    this.visible = visible
    this.x = 0;
    this.y = 0
}

Affirmation.prototype.SetText = function(text)
{
    this.word.text = text;
}