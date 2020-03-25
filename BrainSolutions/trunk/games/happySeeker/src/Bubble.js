
Bubble = function ()
{
	var game = Brain.game;
	this.scoreBonus = 60;
	this.exercise = null;
	this.group = null;
	this.sprite = null;
	this.emotions = [ "Angry", "Disgust", "Fear", "Happy", "Neutral", "Sad", "Suprised"];

	this.face = null;
	this.time = 0;
	this.speed = 0.4;
	this.targetPos = null;
	this.radius = 0;
	this.length = {value: 0}
	this.centerX = game.width / 2;
	this.centerY = game.height / 2;
	this.size = 150;
	this.popped = false;
	this.faceSprite = null;

}

Bubble.prototype.Create = function(exercise, x, y, clockwise, size, face, length)
{
	var game = Brain.game;
	this.length.value = length;
	this.pulse = Brain.AddSprite("pulse", 0, 0, this.size * 1.3, this.size * 1.3, 0.5, 0.5, false);
	this.pulse.visible  =false;
	this.clockwise = clockwise;
	this.exercise = exercise;
	this.group = game.add.group();
	this.size = size;
	this.mask = game.add.graphics(0, 0);
	this.mask.beginFill(Color.blackHex);
	this.mask.drawCircle(0, 0, this.size - 10);
	this.mask.anchor.set(0.5, 0.5);

	this.sprite = Brain.AddSprite("circle", x, y, this.size, this.size, 0.5, 0.5, false);
	this.faceSprite = Brain.AddSprite(face.data.key, x, y, this.size, this.size, 0.5, 0.5, false);
	this.faceSprite.frame = face.data.emotion;
	this.faceSprite.mask = this.mask;

	this.sprite.inputEnabled = true;
	this.sprite.events.onInputDown.add(this.PopBubble, this);
	this.rotate = game.add.tween(this.sprite);
	this.exercise.gameScreen.add(this.pulse);
	this.exercise.gameScreen.add(this.sprite);
	this.exercise.gameScreen.add(this.faceSprite);
}

Bubble.prototype.Init = function(radius)
{		
	var game = Brain.game;
	
	this.sprite.centerX = game.width / 2;
	this.sprite.centerY = game.height / 2;
	//this.targetPos = new Vector(this.sprite.x + this.length.value * Math.sin(radius), this.sprite.y + this.length.value * Math.cos(radius));
	this.radius = radius * (6 / this.exercise.count);

	//this.rotate.to({centerX: this.targetPos.x, centerY: this.targetPos.y}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
	this.Intro();

}

Bubble.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	var speed = this.speed;
	if(this.clockwise == true)
		speed = -this.speed

	this.time += speed * dt;
	this.sprite.centerX = this.centerX + this.length.value * Math.sin(this.radius + this.time);
	this.sprite.centerY = this.centerY + this.length.value * Math.cos(this.radius + this.time);

	this.faceSprite.centerX = this.centerX + this.length.value * Math.sin(this.radius + this.time);
	this.faceSprite.centerY = this.centerY + this.length.value * Math.cos(this.radius + this.time);
	this.mask.x = this.faceSprite.centerX;
	this.mask.y = this.faceSprite.centerY;
	this.pulse.x = this.faceSprite.centerX;
	this.pulse.y = this.faceSprite.centerY;
}

Bubble.prototype.Free = function()
{
	console.log("Memory Free");
	this.sprite.destroy();
	this.faceSprite.destroy();
	this.mask.destroy();
}

Bubble.prototype.Intro = function()
{
	var game = Brain.game;
	this.sprite.alpha = 0;
	this.faceSprite.alpha = 0;
	var length = this.length.value;
	this.length.value = 0;
	var t = game.add.tween(this.length);
	var f = game.add.tween(this.sprite);
	var fw = game.add.tween(this.faceSprite);

	t.to({value: length}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	f.to({alpha: 1}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	fw.to({alpha: 1}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
}

Bubble.prototype.Show = function()
{
	var game = Brain.game;


	if(this.exercise.happyBubble != this)
	{
		this.faceSprite.visible = false;
		this.sprite.frame = 2;
		console.log("nope")
	}
}

Bubble.prototype.Outro = function()
{
	var game = Brain.game;
	this.speed = 10;
	this.sprite.alpha = 1;
	this.faceSprite.alpha = 1;
	this.faceSprite.visible =true;
	this.sprite.frame = 0;

	var t = game.add.tween(this.length);
	var f = game.add.tween(this.sprite);
	var fw = game.add.tween(this.faceSprite);
	var scalef = game.add.tween(this.faceSprite.scale);
	var scale = game.add.tween(this.sprite.scale);
	scale.to({x: 0, y: 0}, 1 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	scalef.to({x: 0, y: 0}, 1 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	t.to({value: 0}, 1 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	f.to({alpha: 0},1 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	fw.to({alpha: 0}, 1 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	t.onComplete.add(this.Free, this);
}

Bubble.prototype.PopBubble = function()
{
	var game= Brain.game;
	if(this.exercise.gameReady == true)
	{
		this.exercise.gameReady = false;
		this.exercise.answerTimer.pause()
		var index = this.emotions.indexOf("Happy");
		var correct = this.faceSprite.frame == index;
		console.log(correct);
		this.popped = true;
		this.pulse.visible =true;
		this.pulse.alpha =1;
	    this.pulse.width = this.size;
	    this.pulse.height = this.size;
	    var pulse = game.add.tween(this.pulse);
   	 	pulse.to({width: this.size * 1.2, height: this.size * 1.1}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	    var fade = game.add.tween(this.pulse);
   	 	fade.to({alpha: 0}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		this.pulse.tint = Color.redHex;
		this.faceSprite.visible = false;
		this.sprite.frame = 2;
		this.exercise.correct = false;
		if(correct)
		{
			sprite = "icon-correct"
			this.exercise.s_win.play()
			this.pulse.tint = Color.greenHex;
			this.sprite.frame = 1;
			this.exercise.score += this.scoreBonus * this.exercise.level;
			this.exercise.correct = true;
		}
		var timer = game.time.create(true);
		timer.add(0.5*1000, this.exercise.LevelEnd, this.exercise);
		timer.start();
	}
}