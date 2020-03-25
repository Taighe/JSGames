ToggleButton = function (text, x, y, callback, context, width, height, sprite, textColor) {
    var game = Brain.game;
    this.button = game.make.button(x, y, sprite || "button", callback, context);
    this.button.onInputDown.add(this.onDown, this);
    //this.button.onInputUp.add(this.onUp, this);
    this.button.onInputOut.add(this.onOut, this);
    this.button.onInputOver.add(this.onOver, this);
    this.button.anchor.set(0.5, 0.5)
    this.button.input.enabled = true;
    this.button.width = width;
    this.button.height = height;
    this.bText = Brain.AddText(text, 0, 0, textColor || Color.orange, 23, 0.5, 0.5, "bold");
    this.bText.align = "center"
    this.group = game.add.group();
    this.group.add(this.button);
    this.group.add(this.bText);
    this.bText.centerX = this.button.centerX;
    this.bText.centerY = this.button.centerY + 2;

    this.defaultColour = textColor || Color.orange;
    return this;
};

ToggleButton.prototype.Untoggle = function () {
    this.bText.addColor(this.defaultColour, 0);
    this.button.frame = 0;
}

ToggleButton.prototype.onDown = function () {
    this.bText.addColor(Color.white, 0);
    this.button.frame = 1;
}

ToggleButton.prototype.onOver = function () {
    this.bText.addColor(Color.white, 0);
    this.button.frame = 1;
}

ToggleButton.prototype.onOut = function () {
    this.bText.addColor(this.defaultColour, 0);
    this.button.frame = 0;
}