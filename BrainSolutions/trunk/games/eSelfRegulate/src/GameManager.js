GameManager = function (exercise)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);

	return this;
};

GameManager.prototype = Object.create(Phaser.Group.prototype);
GameManager.prototype.constructor = GameManager;

GameManager.prototype.Init = function()
{		
	var game = Brain.game;

}

GameManager.prototype.Start = function()
{		
	var game = Brain.game;
}
GameManager.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS /1000;

}

GameManager.prototype.Free = function()
{
	console.log("Memory Free");
}