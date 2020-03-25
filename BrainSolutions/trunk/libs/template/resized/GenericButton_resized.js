GenericButton = function(text, x, y, callback, context, width, height) 
{
    var game = Brain.game;
    this.button = game.make.button(x, y, "button", callback, context, 1, 0, 1, 0);
    this.button.onInputDown.add(this.onDown, this);
    this.button.onInputUp.add(this.onUp, this);
    this.button.onInputOut.add(this.onOut, this);
    this.button.onInputOver.add(this.onOver, this);
    this.button.input.enabled = true;
    this.button.width = width * Brain.scaleRatio;
    this.button.height = height * Brain.scaleRatio;
    this.bText = Brain.AddText(text, this.button.centerX, this.button.centerY, Color.orange, 13, 0.5, 0.5, "bold");
    this.group = game.add.group();
    this.group.add(this.button);
    this.group.add(this.bText);
    this.bText.centerX = this.button.centerX;
    this.bText.centerY = this.button.centerY + 2;
    return this.group;
};

GenericButton.prototype.onDown = function() 
{
    this.bText.addColor(Color.white, 0);
}

GenericButton.prototype.onUp = function() 
{
    this.bText.addColor(Color.orange, 0);
}

GenericButton.prototype.onOver = function() 
{
    this.bText.addColor(Color.white, 0);
}

GenericButton.prototype.onOut = function() 
{
    this.bText.addColor(Color.orange, 0);
}
