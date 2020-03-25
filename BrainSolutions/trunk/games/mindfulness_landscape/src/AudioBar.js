AudioBar = function() 
{
    var game = Brain.game;
    this.emptyBar = null;
    this.fullBar = null;
    this.group = null;
    this.background = null;
    this.pause = false;
    this.maxWidth = null;
    this.time = 0;
    this.currentTime = null;
    this.duration = 0;
    this.durationText = null;
    this.playSprite = null;
    this.stopSprite = null;
    this.lungs = null;
    this.breathTimer = null;
    this.breathTween = null;
    this.lungsTween = null;
    this.lungsMask = null;
    this.sessionTime = 0;
    this.audio = null;
    this.created = false;
}

AudioBar.prototype.constructor = AudioBar;

AudioBar.prototype = 
{
    Init: function(audio, duration)
    {
        var game = Brain.game;
        console.log("starting audio");
        this.audio = audio;

        this.sessionTime = duration * 60;
        
        this.audio.play();
        this.Create();

    },  
    Create: function() 
    {
        var game = Brain.game;
        this.time= 0;
        this.group = game.add.group();
        var bottomY = game.height - game.height / 4;
        this.background = Brain.AddSprite("whitePix", 0, 0, game.width, game.height - bottomY, 0, 0, false);
        this.background.tint = Color.blackHex;
        this.background.alpha = 0.5;
        this.audio.play();
        this.duration = parseFloat(this.audio.totalDuration);
        console.log(parseFloat(this.audio.duration));
        this.audio.addMarker("start", 0, this.duration * 0.9125, 1, false);
        this.audio.addMarker("loop", 0, 0.01, 1, true);
        this.audio.addMarker("end", this.duration * 0.9125, this.duration, 1, false);
        var onPlay = function()
        {
            this.pause = !this.pause;
            Alert.Dismiss();
            if(this.pause == true)
            {
                this.audio.pause();
                this.breathTween.pause();
                this.lungsTween.pause();
                this.maskTween.pause();
                this.playSprite.frame = 2;
            }
            else
            {
                this.audio.resume();
                this.breathTween.resume();
                this.lungsTween.resume();
                this.maskTween.resume();
                this.playSprite.frame = 0;
            }
        }
        this.onPause = function()
        {
            this.pause = true;

            this.audio.pause();
            this.breathTween.pause();
            this.breathTimer.pause();
            this.playSprite.frame = 2;
        }
        var onDown = function()
        {
            this.playSprite.frame = 1;
            if(this.pause)
            {
                this.playSprite.frame = 3;
            }

        }
        var onStop = function()
        {
            var cancel = function(){Alert.Dismiss()};
            var options = [new Option("CANCEL", cancel, this), new Option("END SESSION", this.EndSession, this)];
            this.onPause();
            Alert.Create("Are you sure you want to end the session now?\n\nThis will take you back to the Main Menu.", options, game.width / 2, game.height *0.3, null);
        }
        
        this.stopSprite = new Brain.AddButton("", this.background.width / 10, this.background.centerY, onStop, this, "stop", 80, 80, 0.5, 0.5, 1);
        this.playSprite = game.add.button(this.stopSprite.right + 10, this.background.centerY, "play", onPlay, this);
        this.playSprite.onInputDown.add(onDown, this);
        this.playSprite.width = 80;
        this.playSprite.height = 80;
        this.playSprite.anchor.set(0.5, 0.5);
        this.playSprite.left = this.stopSprite.right + 10;

        this.emptyBar = Brain.AddSprite("whitePix", this.playSprite.right, this.background.centerY, 440,  10, 0, 0, false);
        this.maxWidth = 440;
        this.emptyBar.tint = Color.grayHex;
        this.emptyBar.alpha = 0.9;
        this.emptyBar.left = this.playSprite.right + 25;

        this.fullBar = Brain.AddSprite("whitePix", this.emptyBar.x, this.background.centerY, this.maxWidth, 10, 0, 0, false);
        this.fullBar.tint = Color.lightGrayHex;
        this.currentTime = Brain.AddText("0", this.emptyBar.x, this.background.centerY + 15, Color.white, 24, 0, 0, "normal", 200, "LatoRegular");
        this.durationText = Brain.AddText(this.audio.totalDuration, this.emptyBar.right, this.background.centerY + 15, Color.white, 24, 1, 0, "normal", 500, "LatoRegular");
        this.durationText.right = this.fullBar.right;
        var menu = SelectionMenu.DisplayTopMenu();
        var textSprite = Brain.AddText(menu.Title, this.emptyBar.left, this.emptyBar.top, Color.white, 21, 0, 1, "normal", 500, "LatoRegular");
        var bpm = Brain.AddSprite("lungs-back", game.width * 0.9, this.background.centerY, 150, 150, 0.5, 0.5, false);
        
        this.lungsMask = Brain.AddSprite("lungs-mask", bpm.centerX, bpm.centerY, 150, 150, 0.5, 0.5, false);
        this.lungs = Brain.AddSprite("lungs", bpm.centerX, bpm.centerY, 150, 150, 0.5, 1, false);
        this.lungs.centerY = bpm.centerY;
        this.rect = new Phaser.Rectangle(0, this.lungs.height * 4, this.lungs.width * 4, this.lungs.height * 4);
        console.log(this.lungs.width);
        this.lungs.crop(this.rect);

        this.group.add(this.background);
        this.group.add(this.emptyBar);
        this.group.add(this.fullBar);
        this.group.add(this.playSprite);
        this.group.add(this.stopSprite);
        this.group.add(textSprite);
        this.group.add(this.currentTime);
        this.group.add(this.durationText);
        this.group.add(bpm);
        this.group.add(this.lungsMask);
        this.group.add(this.lungs);
        this.breathTimer = game.time.create(false);
        this.Inhale();
        this.breathTimer.start();
 
        var end = function()
        {
            this.audio.play("end");
            Brain.bgMusic.fadeTo(1* 1000, 0.2);
        }
        var loop = function()
        {
            Brain.bgMusic.fadeTo(1* 1000, 1);
            this.audio.onMarkerComplete.removeAll();
            this.audio.play("loop");
            var timer = game.time.create(true);
            var dur = this.sessionTime - this.duration;
            timer.add(dur * 1000, end, this);
            timer.start();
        }

        this.audio.onMarkerComplete.add(loop, this);
        this.playSprite.frame = 0;
        this.audio.play("start");
        this.created = true;
        console.log("yay");
        this.group.centerX = Brain.centerX;
        this.group.bottom = game.height;

    },
    Update: function()
    {
        var game = Brain.game;
        var dt = game.time.elapsedMS / 1000;

        if(this.pause == false)
        {
            this.time += 1 * dt;
        }


        if(this.audio != null && this.created)
        {
            console.log("update");
            var percent = this.time / this.sessionTime

            this.fullBar.width = percent * this.maxWidth;
            this.currentTime.text = FormatTime(this.time);
            this.durationText.text = FormatTime(this.sessionTime);
            this.lungs.updateCrop();
            return percent;
        }

        return 0;
    },

    Inhale: function()
    {
        var game = Brain.game; 
        this.lungsTween = game.add.tween(this.lungs);
        this.maskTween = game.add.tween(this.lungsMask);
        this.breathTween = game.add.tween(this.rect);
        this.lungsTween.to({width: 200}, 4 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.maskTween.to({width: 200}, 4 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.breathTween.to({y: 0}, 4 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.breathTween.onComplete.add(this.Exhale, this);
    },

    Exhale: function()
    {
        var game = Brain.game;
        this.lungsTween = game.add.tween(this.lungs);
        this.maskTween = game.add.tween(this.lungsMask);
        this.breathTween = game.add.tween(this.rect);
        this.lungsTween.to({width: 150}, 6 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.maskTween.to({width: 150}, 6 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false); 
        this.breathTween.to({y: this.lungs.height * 2}, 6 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.breathTween.onComplete.add(this.Inhale, this);
    },

    EndSession: function()
    {
        var game = Brain.game;
        this.Destroy();
        SelectionMenu.PopMenu();
        game.state.start("VoSelection");
    },

    Destroy: function()
    {
        this.audio.destroy();
        this.group.destroy();
    }
};
