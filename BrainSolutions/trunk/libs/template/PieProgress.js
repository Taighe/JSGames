PieProgress = function() 
{
    this.radius = null;
    this.progress = null;
    this.weight = null;
    this.color = null;
    this.image = null;
    this.angle = null;
    this.bmd = null;
}

PieProgress.prototype.Create = function(game, x, y, radius, color, angle, weight) 
{
    this.radius = radius;
    this.progress = 0;
    this.weight = weight * Brain.scaleRatio;
    this.color = color || "#fff";
    this.bmd = game.make.bitmapData((this.radius * 2) + (this.weight * (this.radius * 0.6)), (this.radius * 2) + (this.weight * (this.radius * 0.6)));
    this.image = game.add.image(x, y, this.bmd);
    this.image.anchor.set(0.5, 0.5);
    this.image.angle = angle || -90;
    this.UpdateProgress();
}

PieProgress.prototype.UpdateProgress = function() 
{
    var progress = this.progress;
    progress = Phaser.Math.clamp(progress, 0.00001, 0.99999);
    
    this.bmd.clear();
    this.bmd.ctx.strokeStyle = this.color;
    this.bmd.ctx.lineWidth = this.weight * this.radius;
    this.bmd.ctx.beginPath();
    this.bmd.ctx.arc(this.bmd.width * 0.5, this.bmd.height * 0.5, this.radius - 15, 0, (Math.PI * 2) * progress, false);
    this.bmd.ctx.stroke();
    this.bmd.dirty = true; 
}
