Lungs = function (exercise)
{
	var game = Brain.game;
	this.exercise = exercise;
	Phaser.Group.call(this, game);
	this.lungsBack = new Phaser.Sprite(game, 0, 0, "body");
	this.lungsBack.anchor.set(0.5, 0.5);
	this.lungsBack.scale.set(0.6, 0.6);
	this.lungs = new Phaser.Sprite(game, 0, 0, "lungs");
	this.lungs.anchor.set(0.5, 0.5);
	this.lungs.width = 150;
	this.lungs.height = 150;
	this.lungs.centerX = this.lungsBack.centerX + 5;
	this.lungs.centerY = this.lungsBack.centerY - 15;
	this.rect = new Phaser.Rectangle(0, 500, 500, 500);
	this.fill = new Phaser.Sprite(game, 0, 0, "fill");
	this.fill.anchor.set(0.5, 0);
	this.fill.centerX = this.lungs.width;
	this.bmd = game.make.bitmapData(268, 288);
	this.bmd.alphaMask(this.fill, "mask");
	this.air = new Phaser.Sprite(game, 0, 0, this.bmd);
	this.air.anchor.set(0.5, 0.5);
	this.air.width = 150;
	this.air.height = 140;
	this.air.centerX = this.lungs.x;
	this.air.centerY = this.lungs.centerY + 2;
	this.breathSize= game.add.tween(this.lungs.scale);
	this.breathTween = game.add.tween(this.fill);
	this.airSize = game.add.tween(this.air.scale);
	this.bodyTween = game.add.tween(this.lungsBack.scale);
	this.add(this.lungsBack );
	this.add(this.air );
	this.add(this.lungs );
	this.breathingIn = true
	game.add.existing(this);
	this.centerX = Brain.centerX;
	this.centerY = game.height * 0.6;
	this.pause = true;
	return this;
};

Lungs.prototype = Object.create(Phaser.Group.prototype);
Lungs.prototype.constructor = Lungs;

Lungs.prototype.Init = function(breathRate)
{		
	var game = Brain.game;
	this.breathRate = breathRate
	this.breathingIn = true
	this.s_in = game.add.audio("s_in")
	this.s_out = game.add.audio("s_out")
	this.breathTween.manager.remove(this.breathTween);
	this.airSize.manager.remove(this.airSize);
	this.breathSize.manager.remove(this.breathSize);
	this.bodyTween.manager.remove(this.bodyTween);
	this.bodyTween = game.add.tween(this.lungsBack.scale);
	this.breathSize = game.add.tween(this.lungs.scale);
	this.airSize = game.add.tween(this.air.scale);
	this.breathTween = game.add.tween(this.fill);

	this.lungsBack.scale.set(0.6, 0.6);
	this.lungs.scale.set(0.5, 0.5);
	this.air.scale.set(0.5, 0.5);
	
	var br = (60 / breathRate) * 0.5;
	
	this.fill.y = 288;
	this.bodyTween.to({x:0.63, y: 0.62}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.breathTween.to({y: -90}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.breathSize.to({x: 0.7, y: 0.55}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.airSize.to({x: 0.7, y: 0.55}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.sound = this.s_in
	this.In();
	this.s_in.play()
	this.breathTween.onLoop.add(this.PlaySound, this);
}

Lungs.prototype.Start = function()
{		
	var game = Brain.game;
	this.breathingIn = true
	this.breathTween.manager.remove(this.breathTween);
	this.airSize.manager.remove(this.airSize);
	this.breathSize.manager.remove(this.breathSize);
	this.bodyTween.manager.remove(this.bodyTween);
	this.bodyTween = game.add.tween(this.lungsBack.scale);
	this.breathSize = game.add.tween(this.lungs.scale);
	this.airSize = game.add.tween(this.air.scale);
	this.breathTween = game.add.tween(this.fill);

	
	var br = (60 / this.breathRate) * 0.5;
	
	this.fill.y = 288;
	this.bodyTween.to({x:0.63, y: 0.62}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.breathTween.to({y: -90}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.breathSize.to({x: 0.7, y: 0.55}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.airSize.to({x: 0.7, y: 0.55}, br*1000, Phaser.Easing.Linear.None, true, 0, -1, true);
	this.sound = this.s_in
	this.In();
	this.s_in.play()
	this.breathTween.onLoop.add(this.PlaySound, this);
}

Lungs.prototype.Mute = function(enable)
{		
	var game = Brain.game;

	this.s_in.mute = enable
	this.s_out.mute = enable

}

Lungs.prototype.Play = function()
{		
	var game = Brain.game;
	this.pause= !this.pause;
	if(this.pause == false)
	{
		this.breathTween.resume();
		this.bodyTween.resume();
		this.breathSize.resume();
		this.airSize.resume();
	}
	else if(this.pause == true)
	{
		this.breathTween.pause();
		this.bodyTween.pause();
		this.breathSize.pause();
		this.airSize.pause();
	}
}

Lungs.prototype.In = function()
{		
	var game = Brain.game;
	this.breathTween.onComplete.removeAll();

	this.breathTween.timeScale = 1;
	this.bodyTween.timeScale = 1;
	this.breathSize.timeScale = 1;
	this.airSize.timeScale = 1;
	this.breathTween.onLoop.add(this.Out, this);
}

Lungs.prototype.PlaySound = function()
{		
	var game = Brain.game;
	this.breathingIn = !this.breathingIn

	if(this.breathingIn)
		this.s_in.play()
	else
		this.s_out.play()
}

Lungs.prototype.Out = function()
{		
	var game = Brain.game;

	this.breathTween.onComplete.removeAll();
	this.breathTween.timeScale = 1;
	this.bodyTween.timeScale = 1;
	this.breathSize.timeScale = 1;
	this.airSize.timeScale = 1;
	console.log("change");
	this.breathTween.onLoop.add(this.In, this);
}

Lungs.prototype.update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	this.bmd.alphaMask(this.fill, "mask");
}

Lungs.prototype.Free = function()
{
	console.log("Memory Free");
}