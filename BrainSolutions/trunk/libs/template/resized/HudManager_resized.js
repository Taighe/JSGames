HudManager =
{
    hud: null,
    exercise: null,
    duration: null,
    frameRate: true,
    fps: null
};

HudManager.Init = function(exercise)
{
    var game = Brain.game;
    HudManager.exercise = exercise;
    this.ripplefade = null;
    this.s_tictoc = game.add.audio("s_tictoc");
    var timer = HudManager.exercise.timer;
    game.time.advancedTiming = HudManager.frameRate;

    HudManager.duration = HudManager.exercise.timer.duration / 1000; // The duration of the exercise converted to seconds    
    var topRight = new Vector(game.canvas.width - game.canvas.width / 10, game.canvas.height / 15);
    var topLeft = new Vector(game.canvas.width / 25, game.canvas.height / 25);
    this.warning = false;
    this.ripple = Brain.AddSprite("pulse", topRight.x, topRight.y, 0, 0, 0.5, 0.5, false);

    this.timerSprite = Brain.AddSprite("time-back", topRight.x, topRight.y, 50, 50, 0.5, 0.5, false);
    this.timeSprite = Brain.AddText("0", this.timerSprite.centerX, this.timerSprite.centerY+ 15, Color.white, 20, 0.5, 0.5, "bold", 800, "LatoRegular");
    var scoreText = Brain.AddText("SCORE", topLeft.x, topLeft.y, Color.lightGray, 10, 0, 0.5);
    this.scoreSprite = Brain.AddText("1000", topLeft.x, scoreText.bottom - 5, Color.lightPurple, 32, 0, 0, "bold", 800, "LatoRegular");
    this.countDownTimer = game.time.create(true);
    this.countDownTimer.start();
    this.countDownTimer.pause();
    var tictock = function()
    {
        this.s_tictoc.play();
    }
    this.countDownTimer.loop(2*1000, tictock, this);
    this.ripple.alpha = 0.6;
    this.ripplefade = Brain.TweenFade(this.ripple, 0, false, 0.5, false);
    this.ripplefade.loop(true);
    this.ripplefade.start();

    this.rippleT = game.add.tween(this.ripple);

    this.rippleT.to({width: 200, height: 200}, 1*1000, Phaser.Easing.Linear.None, false, 0,0, false);
    this.rippleT.loop(true);
    this.rippleT.start();

    HudManager.hud = game.add.group();
    HudManager.hud.add(this.ripple);
    HudManager.hud.add(this.timerSprite);
    HudManager.hud.add(this.scoreSprite);
    HudManager.hud.add(this.timeSprite);
    HudManager.hud.add(scoreText);

}

HudManager.Warning = function() 
{
    var game =Brain.game;
    this.s_tictoc.play();
    this.countDownTimer.start();

    this.ripple.tint = Color.redHex;
    var tint = game.add.tween(this.timerSprite);
    tint.to({tint: Color.redHex}, 1*1000, Phaser.Easing.Quadratic.InOut, true, 0,0, false);
    this.ripplefade.resume();
    this.rippleT.resume();

    this.countDownTimer.resume();
}

HudManager.Update = function() 
{
    var game = Brain.game;
    var timer = HudManager.exercise.timer;
    var currentTime = HudManager.duration - timer.seconds;
    currentTime = parseInt(currentTime);

    this.scoreSprite.text = HudManager.exercise.score;
    this.timeSprite.text = currentTime.toString();
    if(this.warning == false && currentTime < 10)
    {
        this.warning = true;
        this.Warning();
        this.ripple.visible = true;
    }
    else if( currentTime > 10)
    {
        this.warning = false;

        this.s_tictoc.stop();
        this.ripple.visible = false;
        this.ripplefade.pause();
        this.rippleT.pause();
        this.timerSprite.tint = Color.whiteHex;
    }

    if(this.exercise.timer.paused)
    {
        this.s_tictoc.stop();
    }

}

HudManager.Free = function()
{
    HudManager.hud.destroy();
}