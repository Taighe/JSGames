function Ball(exercise)
{
	this.sprite = null;
	this.width = 150;
	this.height = 150;
	this.spinRate = 0;
	this.gravity = 50;
	this.velocity = new Vector(0, 0);
	this.maxVelocity = new Vector(300, 3000);
	this.minVelocity = new Vector(-300,-3000);
	this.physicsEnabled = false;
	this.balanceSway = null;
	this.disableBalance = false;
	this.exercise = exercise;
	this.timer = null;
}

Ball.prototype.Create = function()
{
	var game = Brain.game;
	this.timer = game.time.create(false);
	this.timer.add(3 * 1000, this.exercise.ExerciseEnd, this.exercise);
	this.shadow = Brain.AddSprite("shadow", this.centerX, game.height, 200, 100, 0.5, 0.5, false);
	this.sprite = Brain.AddSprite("ball", game.width / 2, game.height / 2, this.width, this.height, 0.5, 0.5);
	this.sprite.centerX = game.width / 2;
	this.sprite.centerY = game.height / 2;
	this.sprite.frame = 0;
	this.sprite.inputEnabled = true;
	this.sprite.animations.add("spin", null, 60, false, true);
	this.sprite.events.onInputDown.add(this.Start, this);

	this.shadow.centerY = game.height - 50;
};

Ball.prototype.Start = function()
{
	var game = Brain.game;
	var point = game.input.activePointer;
	console.log(point);
	this.exercise.instructTimer.stop()
	this.exercise.instructions[this.exercise.index].visible = false
	this.balanceSway = GetRandomFloat(-1, 1, game);
	this.physicsEnabled = true;
	this.spinRate = 60;
	this.velocity.y = -1000;
	this.sprite.events.onInputDown.dispose();
	this.sprite.play("spin", this.spinRate, true, false);
}

Ball.prototype.Update = function()
{
	var game = Brain.game;
	var point = game.input.activePointer;
	if(point.identifier == null)
	{
		point.x = -1;
		point.y = -1;
	}
	
	if(this.physicsEnabled == true)
	{
		var dt = game.time.physicsElapsed;
		this.velocity.y += this.gravity;

		if(point.x >= this.sprite.left + 10 && point.x <= this.sprite.right - 10)
		{
			if(point.y >= this.sprite.centerY + 10 && point.y <= this.sprite.bottom)
			{
				this.Balance(point);
			}
		}

		this.Bounds();

		this.velocity = this.velocity.MinMax(this.minVelocity, this.maxVelocity);
		this.sprite.x += this.velocity.x * dt;
		this.sprite.y += this.velocity.y * dt;
		if(this.disableBalance == false)
		{
			this.sprite.angle = 50 * (this.velocity.x / this.maxVelocity.x);
		}		
	}
	this.shadow.centerX = this.sprite.centerX;
	var diffY = (game.height - this.sprite.bottom) / game.height;
	this.shadow.alpha = 1 - diffY;
};

Ball.prototype.Bounds = function()
{
	var game = Brain.game;
	if(this.sprite.left < 0 )
	{
		console.log("left wall");
		this.sprite.left = 0 + 10;
		this.velocity.y *= -0.5;
		this.velocity.x = 500;
		this.Lose()
	}

	if(this.sprite.right > game.width)
	{
		console.log("right wall");
		this.sprite.right = game.width - 10;
		this.velocity.y *= -0.5;
		this.velocity.x = -500;
		this.Lose()
	}

	if(this.sprite.bottom > game.height - 50)
	{
		//this.sprite.bottom = game.height - 50;
		this.velocity.y *= -0.5;
		this.velocity.x *= 0.5;
		this.Lose();
	}
}

Ball.prototype.Balance = function(point)
{
	var game = Brain.game;
	this.exercise.timer.resume();
	this.exercise.Start();
	if(this.disableBalance == true)
	{
		this.balanceSway = 0;
		this.velocity.x = 0;
		return;
	}
	this.velocity.y = 0;
	this.sprite.centerY = point.y - this.sprite.height / 2;
	var width = this.sprite.width * 0.05;
	var diffX = (point.x - this.sprite.centerX) / width;

	this.balanceSway = -1 * diffX;
	this.velocity.x = 45 * this.exercise.level / 10 * this.balanceSway;
	console.log(Math.abs(diffX));
	var bonus = 1 * this.exercise.level;
	if(diffX > -3 && diffX < 3)
	{
		this.exercise.score += 1 * bonus;
		//this.exercise.levelUpTimer.resume();
		//this.exercise.levelDownTimer.pause();
	}
	else
	{
		//this.exercise.levelUpTimer.pause();
		//this.exercise.levelDownTimer.resume();
	}

}

Ball.prototype.Lose = function()
{
	if(this.disableBalance == false)
	{
		this.exercise.correct = false;
		this.disableBalance = true;
		this.exercise.Lose();
		this.sprite.animations.stop("spin", false);
		this.timer.start();
		this.exercise.s_lose.play();
	}
}

Ball.prototype.Free = function()
{
	this.sprite.destroy();
}