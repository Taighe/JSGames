Star = function() 
{
    this.sprite = null;
    this.width = 90 * 1.3; 
    this.height = 90* 1.3;
};

Star.prototype.Create = function(x, y) 
{
    var game = Brain.game;
    this.sprite = Brain.AddSprite("star", x, y, this.width, this.height, 0.5, 0.5);
    return this;
}

Star.prototype.Animate = function() 
{
    var game = Brain.game;
    var tween = game.add.tween(this.sprite);
    tween.to({width: this.width, height: this.height}, 0.5 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
    ParticleBurst(new Vector(this.sprite.x, this.sprite.y), "star", game, 0.1, 0.2);
}