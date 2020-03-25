GenericButton = function (text, x, y, callback, context, width, height) 
{
    var game = Brain.game;
    this.graphic = new Phaser.Graphics(game, 0, 0);
    this.graphic.beginFill(Color.whiteHex);
    this.graphic.lineStyle(5, Color.orangeHex, 1);
    this.width = width
    this.height = height
    this.graphic.drawRoundedRect(0, 0, width, height, 15);
    this.button = game.make.button(x, y, "", callback, context, 1, 0, 1, 0);
    this.button.onInputDown.add(this.onDown, this);
    this.button.onInputUp.add(this.onUp, this);
    this.button.onInputOut.add(this.onOut, this);
    this.button.onInputOver.add(this.onOver, this);
    this.button.anchor.set(0.5, 0.5)
    this.button.input.enabled = true;
    this.button.width = width;
    this.button.height = height;
    this.bText = Brain.AddText(text, 0, 0, Color.orange, 23, 0.5, 0.5, "bold");
    this.bText.align = "center"
    game.add.existing(this.graphic)
    this.group = game.add.group();
    this.group.add(this.graphic)
    this.group.add(this.button);
    this.group.add(this.bText);
    this.button.centerX = 0
    this.button.centerY = 0
    this.graphic.centerX = 0
    this.graphic.centerY = 0
    this.bText.centerX = 0
    this.bText.centerY = 0

    return this.group;
};

GenericButton.prototype.onDown = function () 
{
    this.bText.addColor(Color.white, 0);
    this.graphic.clear()
    this.graphic.lineStyle(5, Color.whiteHex, 1);
    this.graphic.beginFill(Color.orangeHex);
    this.graphic.drawRoundedRect(0, 0, this.width, this.height, 15);
}

GenericButton.prototype.onUp = function () {
    this.bText.addColor(this.defaultColour, 0);
    this.graphic.clear()
    this.graphic.lineStyle(5, Color.orangeHex, 1);
    this.graphic.beginFill(Color.whiteHex);
    this.graphic.drawRoundedRect(0, 0, this.width, this.height, 15);
}

GenericButton.prototype.onOver = function () {
    this.bText.addColor(Color.white, 0);
    this.graphic.clear()
    this.graphic.lineStyle(5, Color.whiteHex, 1);
    this.graphic.beginFill(Color.orangeHex);
    this.graphic.drawRoundedRect(0, 0, this.width, this.height, 15);
}

GenericButton.prototype.onOut = function () {
    this.bText.addColor(this.defaultColour, 0);
    this.graphic.clear()
    this.graphic.lineStyle(5, Color.orangeHex, 1);
    this.graphic.beginFill(Color.whiteHex);
    this.graphic.drawRoundedRect(0, 0, this.width, this.height, 15);
}
