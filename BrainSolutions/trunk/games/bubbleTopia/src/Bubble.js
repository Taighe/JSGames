Bubble = function ()
{
	var game = Brain.game;
	this.scoreBonus = 60;
	this.exercise = null;
	this.group = null;
	this.sprite = null;
	this.word = null;
	this.time = 0;
	this.tween = null;
	this.wordTween = null;
	this.scale = 1;
	this.targetPos = null;
	this.radius = 0;
	this.length = {value: 0}
	this.centerX = game.width / 2;
	this.centerY = game.height / 2;
	this.popped = false;
	this.originWord = ""
};

Bubble.prototype.Create = function(exercise, word, x, y)
{
	var game = Brain.game;
	this.s_pop = game.add.audio("s_pop");
	this.exercise = exercise;
	this.group = game.add.group();
	this.sprite = Brain.AddSprite("bubble", x, y, 70, 70, 0.5, 0.5, false);

	this.word = Brain.AddText(word, x, y, Color.lightBlue, 28, 0.5, 0.5);
	this.originWord = word;
	this.word.text = this.word.text.toUpperCase()
	this.word.align = "center";
	this.scale = this.word.width + 25;
	this.sprite.width = this.scale;
	this.sprite.height = this.scale;
	this.sprite.inputEnabled = true;
	this.sprite.events.onInputDown.add(this.PopBubble, this);
	this.rotate = game.add.tween(this.sprite);
	this.exercise.gameScreen.add(this.sprite);
	this.exercise.gameScreen.add(this.word);
}

Bubble.prototype.Init = function(radius)
{		
	var game = Brain.game;
	
	this.sprite.centerX = game.width / 2;
	this.sprite.centerY = game.height / 2;
	//this.targetPos = new Vector(this.sprite.x + this.length.value * Math.sin(radius), this.sprite.y + this.length.value * Math.cos(radius));
	this.radius = radius * 2;
	if(this.exercise.count >= 4)
	{
		this.radius = radius * 1.5;
	} 

	if(this.exercise.count >= 5)
	{
		this.radius = radius * 1.3;
	} 
	if(this.exercise.count >= 6)
	{
		this.radius = radius * 1;
	} 
	if(this.exercise.count >= this.exercise.maxBubbleCount)
	{
		this.radius = radius * 0.9;
	} 
	console.log(this.radius);
	//this.rotate.to({centerX: this.targetPos.x, centerY: this.targetPos.y}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
	this.Intro();

}

Bubble.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS / 1000;
	if(this.popped)
		return;
	this.time += 0.4 * dt;
	this.sprite.centerX = this.centerX + this.length.value * Math.sin(this.radius + this.time);
	this.sprite.centerY = this.centerY + this.length.value * Math.cos(this.radius + this.time);

	this.word.centerX = this.centerX + this.length.value * Math.sin(this.radius + this.time);
	this.word.centerY = this.centerY + this.length.value * Math.cos(this.radius + this.time);
}

Bubble.prototype.Free = function()
{
	console.log("Memory Free");
	this.sprite.destroy();
	this.word.destroy();
}

Bubble.prototype.Intro = function()
{
	var game = Brain.game;
	this.sprite.alpha = 0;
	this.word.alpha = 0;
	var t = game.add.tween(this.length);
	var f = game.add.tween(this.sprite);
	var fw = game.add.tween(this.word);

	t.to({value: 200}, 2 * 1000, Phaser.Easing.Elastic.Out, true, 0, 0, false);
	f.to({alpha: 1}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	fw.to({alpha: 1}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	this.In();
}

Bubble.prototype.Outro = function()
{
	var game = Brain.game;
	if(this.popped == true)
		return;
	this.sprite.alpha = 1;
	this.word.alpha = 1;
	var w = game.add.tween(this.word);
	var t = game.add.tween(this.sprite);
	var f = game.add.tween(this.sprite);
	var fw = game.add.tween(this.word);
	this.tween.stop();
	t.to({centerX: game.width / 2, centerY: game.height / 2, width: 0, height: 0}, 0.5 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	w.to({centerX: game.width / 2, centerY: game.height / 2, width: 0, height: 0}, 0.5 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	f.to({alpha: 0}, 0.5 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	fw.to({alpha: 0}, 0.5 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
}


Bubble.prototype.In = function()
{
	var game = Brain.game;
	this.wordTween = game.add.tween(this.word.scale);
	this.tween = game.add.tween(this.sprite);
	this.tween.to({width: this.scale + 15, height: this.scale }, 1 * 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
	this.wordTween.to({x: 1, y: 0.9 }, 1 * 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
	this.tween.onComplete.add(this.Out, this);
}

Bubble.prototype.Out = function()
{
	var game = Brain.game;
	this.wordTween = game.add.tween(this.word.scale);
	this.tween = game.add.tween(this.sprite);
	this.tween.to({width: this.scale, height: this.scale + 15}, 1 * 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
	this.wordTween.to({x: 0.9, y: 1 }, 1 * 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
	this.tween.onComplete.add(this.In, this);
}

Bubble.prototype.PopBubble = function()
{
	var game= Brain.game;
	if(this.exercise.gameReady == true)
	{
		this.s_pop.play();
		this.s_pop._sound.playbackRate.value = GetRandomFloat( 0.6, 2, game);
		var wordIndex = this.exercise.positiveWords.indexOf(this.originWord);
		var posWord = this.exercise.positiveWords[wordIndex];
		var correct = posWord == this.originWord
		console.log(correct);
		this.popped = true;
		var sprite = "icon-wrong";
		this.exercise.correct = false;
		if(correct)
		{
			sprite = "icon-correct"
			this.exercise.score += this.scoreBonus * this.exercise.level;
			this.exercise.correct = true;
		}

		var tween = game.add.tween(this.word);
		this.sprite.visible = false;
		tween.to({alpha: 0}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		tween.onComplete.add(this.Free, this);
		var emitter = ParticleBurst(new Vector(this.sprite.centerX, this.sprite.centerY), sprite, game, 0.3, 0.7, Color.white);
		this.exercise.LevelEnd();
	}
}