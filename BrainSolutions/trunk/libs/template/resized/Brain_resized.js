function BrainGame(title, icon, instructions, info)
{
    this.title = title;
    this.icon = icon;
    this.instructions = instructions;
    this.shadow = true;
    this.size = 110; 
    this.titleSize= 28;
    this.instructionsSize= 14;
    this.info = info;
}

Brain = 
{
    /* Here we've just got some global level vars that persist regardless of State swaps */
    endLevel: false,
    highscore: 0,
    skillLevel: 0,
    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,
    bgMusic: null,
    /* Your game can check Bomber.orientated in internal loops to know if it should pause or not */
    orientated: false,
    // If we go landscape/portrait, check if we were paused before we went into it
    prePause: false,
	popup: null,
    game: null,
    centerX: null,
    centerY: null,
    topY: null,
    bottomY: null,
    scaleRatio: null,
    scale: null,
    width: null,
    height: null,
    sWidth: null,
    sHeight: null
};

Brain.Boot = function(game) 
{
    Brain.game = game;

    console.log("boot");
};

Brain.Boot.prototype = 
{
    preload: function() 
    {
        var game = Brain.game;
    },

    create: function() 
    {
        var game = Brain.game;

        game.cache.destroy();
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        Brain.centerX = game.width / 2;
        Brain.centerY = game.height / 2;
        if (game.device.desktop) 
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            Brain.scaleRatio = 1;
            // this.scale.minWidth = 256;
            // this.scale.minHeight = 196;
            // this.scale.maxWidth = 1366;
            // this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.updateLayout(true);
        } 
        else 
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            this.scale.minWidth = game.width / 15;
            this.scale.minHeight = game.height / 15;
            this.scale.maxWidth = game.width;
            this.scale.maxHeight = game.height;
            Brain.scaleRatio = window.devicePixelRatio;
            if(game.device.iPad == true)
            {
                Brain.scaleRatio = window.devicePixelRatio * 1.5;
            }
            if(game.device.iPhone4 == true)
            {
                Brain.scaleRatio = window.devicePixelRatio * 0.8;
            }
            if(game.device.iPhone == true)
            {
                Brain.scaleRatio = window.devicePixelRatio * 1.04;
            }
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(false, true);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.updateLayout(true);
        }

        this.state.start("Preloader");           
    },

    gofull: function () 
    {

        if (this.scale.isFullScreen)
        {
            this.scale.stopFullScreen();
        }
        else
        {
            this.scale.startFullScreen(false);
        }

    },

    gameResized: function(width, height) 
    {
        var game = Brain.game;
        console.log(game.canvas.width  + ":" + game.canvas.height);
        this.scale.updateLayout(true);
    },

    enterIncorrectOrientation: function() 
    {
        //this.game.scale.stopFullScreen();

        Brain.orientated = false;

        document.getElementById('orientation').style.display = 'block';

        prePause = this.game.paused;
        var game = Brain.game;
        this.game.paused = true;

        console.log("landscape")
    },

    leaveIncorrectOrientation: function() 
    {
        document.getElementById('orientation').style.display = 'none';

        if (prePause)
            this.game.paused = true;
        else
            this.game.paused = false;

        Brain.orientated = true;
        var game = Brain.game;
        //game.canvas.width = Brain.width;
        //this.scale.setGameSize(Brain.width, Brain.height);
    }

};

Brain.FullScreen = function()
{      

}

Brain.AddText = function(text, x, y, color, size, anchorX, anchorY, weight, wrapWidth, font)
{
    var game = Brain.game;
    var titleText = game.add.text(x, y, text);
    titleText.font = font;
    titleText.fontSize = size * Brain.scaleRatio;
    titleText.fill = color;
    titleText.fontWeight = weight;
    titleText.wordWrapWidth = wrapWidth;
    titleText.wordWrap = true;
    titleText.anchor.set(anchorX, anchorY);
    return titleText;
};

Brain.AddSprite = function(key, x, y, width, height, anchorX, anchorY, scale)
{
    var sprite = Brain.game.add.sprite(x, y, key);
    sprite.anchor.set(anchorX, anchorY);
    sprite.width = width * Brain.scaleRatio;
    sprite.height = height * Brain.scaleRatio;

    //sprite.alpha = 0.5;
    return sprite;
};



Brain.TweenAway = function(sprite)
{
    var game = Brain.game;
    var fade = game.add.tween(sprite);
    fade.to({alpha: 0}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
}

Brain.TweenIn = function(sprite, posY)
{
    var game = Brain.game;
    var x = game.add.tween(sprite);
    sprite.centerY = game.height;
    x.to({centerY: posY }, 1 * 1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
}

Brain.TweenScale = function(sprite, width, height, start, duration, repeat)
{
    var game = Brain.game;
    var x = game.add.tween(sprite);

    x.to({width: width, height: height}, duration * 1000, Phaser.Easing.Linear.None, start, 0, repeat, false);
    return x;
}

Brain.TweenScale2 = function(sprite, width, height, start, duration)
{
    var game = Brain.game;
    var x = game.add.tween(sprite.scale);

    x.to({x: width, y:height}, duration * 1000, Phaser.Easing.Linear.None, start, 0, 0, false);
}

Brain.TweenScaleIn = function(sprite, x, y)
{
    var game = Brain.game;
    var x = game.add.tween(sprite);

    x.to({x: x, y:y}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
}

Brain.TweenFade = function(sprite, alpha, start, duration, repeat)
{
    var game = Brain.game;
    var x = game.add.tween(sprite);

    x.to({alpha: alpha}, duration * 1000, Phaser.Easing.Linear.None, start, 0, repeat, false);
    return x;
}

Brain.TweenLineIn = function(sprite, width, height)
{
    var game = Brain.game;
    var x = game.add.tween(sprite);
    sprite.width = width / 10;
    sprite.height = height * 2;
    //var fade = game.add.tween(sprite);
    x.to({height: height, width: width}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    //fade.to({alpha: 0}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
}

Brain.TweenOut = function(sprite)
{
    var game = Brain.game;
    var x = game.add.tween(sprite);
    //var fade = game.add.tween(sprite);
    x.to({height: sprite.height, width: sprite.width}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    //fade.to({alpha: 0}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
}

InfoPanel = function(info)
{
    var game = Brain.game;
    Phaser.Group.call(this, game);
    var graphics = new Phaser.Graphics(game, 0, 0);
    graphics.beginFill(Color.purpleHex);
    graphics.drawRoundedRect(0, 0, 500, 700, 50);
    graphics.endFill();
    var infoPanelTex = graphics.generateTexture(); 
    this.infoPanel = new Phaser.Sprite(game, 0, 0, infoPanelTex);
    var info = Brain.AddText(info, 0, 0, Color.white, 16, 0.5, 0.5, "bold", 450, "LatoRegular");
    info.addFontWeight("normal", 15);
    info.addFontWeight("normal", 15);
    info.align = "left";
    this.infoBack = new Phaser.Button(game,0, 0,"whitePix", this.Dismiss, this);
    this.infoBack.width = game.width;
    this.infoBack.height =game.height;
    this.infoBack.tint = Color.blackHex;
    this.infoBack.alpha = 0.5;
    this.infoBack.anchor.set(0.5, 0.5);
    this.infoPanel.anchor.set(0.5, 0.5);
    info.anchor.set(0.5, 0.5);
    this.add(this.infoBack);
    this.add(this.infoPanel);
    this.add(info);
    this.centerX = Brain.centerX;
    this.centerY = Brain.centerY;
    this.alpha = 0;
    this.infoPanel.scale.set(0, 0);
    this.infoBack.visible = false;
    game.add.existing(this);
    return this;
}

InfoPanel.prototype = Object.create(Phaser.Group.prototype);
InfoPanel.prototype.constructor = InfoPanel;
InfoPanel.prototype.Display = function()
{
    var game = Brain.game;
    this.infoBack.visible = true;
    var fade = Brain.TweenFade(this, 1, true, 0.3, 0);
    var tween = Brain.TweenScale2(this.infoPanel, 1, 1, true, 0.3);
}

InfoPanel.prototype.Dismiss = function()
{
    var game = Brain.game;
    this.infoBack.visible = false;
    var fade = Brain.TweenFade(this, 0, true, 0.3, 0);
    var tween = Brain.TweenScale2(this.infoPanel, 0, 0, true, 0.3);
}

Alert =
{
    background: null,
    alert: null,
    options: null,
    group: null,   
    context: null,
    spinner: null,
    audio: null
};

Alert.Create = function(alert, options, x, y, musicPath)
{
    var game = Brain.game;
    if(Alert.alert != null)
    {
        Alert.options.destroy();
        Alert.background.destroy();
        Alert.alert.destroy();
        Alert.group.destroy();
    }

    Alert.options = game.add.group();
    Alert.options.inputEnableChildren =true;
    Alert.group = game.add.group();
    Alert.group.inputEnableChildren =true;
    Alert.background = Brain.AddSprite("alert", x, y, 400, 300, 0.5, 0.5, false);
    Alert.background.tint = Brain.gray;
    Alert.background.anchor.set(0.5,0.5);
    Alert.background.alpha = 0;
    Alert.alert = Brain.AddText(alert, Alert.background.x, Alert.background.top, Color.white, 23, 0.5, 0.5, "normal", 1000, "LatoRegular" );
    Alert.alert.top = Alert.background.top + 50;
    Alert.alert.align = "center";
    Alert.alert.wordWrapWidth = Alert.background.width - Alert.background.width / 4;
    Alert.alert.alpha = 0;
    for(i = 0; i < options.length; i++)
    {
        var button = new Brain.AddButton(options[i].text, 0, y, options[i].callback, options[i].context, "button", 150, 50, 0, 0.5, 18);
        button.x = 0 + (button.width + 15) * i;
        button.onChildInputDown.add(this.Dismiss, this, 1);
        Alert.options.add(button)
    }
    
    Alert.options.alpha = 0;
    Alert.options.centerX = this.background.x;
    Alert.options.centerY = this.background.bottom * 0.9;
    Alert.group.add(Alert.background);
    Alert.group.add(Alert.alert);
    Alert.group.add(Alert.options);

    Brain.TweenFade(Alert.background, 0.5, true, 1, 0);
    Brain.TweenFade(Alert.alert, 1, true, 1, 0);
    Brain.TweenFade(Alert.options, 1, true, 1, 0);
    game.load.onLoadComplete.removeAll();
    game.load.onLoadStart.add(Alert.LoadStart, this);
    game.load.onLoadComplete.add(Alert.LoadComplete, this);

    game.load.audio(Brain.music, musicPath);
    game.load.start();
}

Alert.LoadStart = function()
{
    console.log("loading");
    Alert.options.visible = false;
    Alert.spinner = new Spinner(Alert.background.x, Alert.background.bottom * 0.9);
}

Alert.LoadComplete = function()
{
    var game = Brain.game;
    Alert.audio = game.add.sound(Brain.music);
    Alert.audio.onDecoded.add(Alert.Decoded, this);
}

Alert.Decoded  =function()
{
    console.log("finished");
    Alert.options.visible = true;
    Alert.spinner.Dismiss();
    Alert.spinner = null;
}

Alert.Dismiss = function()
{
    Alert.options.ignoreChildInput = true;
    console.log("about to destroy");

    var game = Brain.game;
    Brain.TweenFade(this.group, 0, true, 0.1);
    var timer = game.time.create(true);
    timer.add(0.1 * 1000, this.Destroy, this);
    timer.start();
}

Alert.Destroy = function()
{
    console.log("Memory free");
    Alert.group.destroy();
}

function Option(text, callback, context)
{
    this.text = text;
    this.callback = callback;
    this.context = context;
}

Brain.AddButton = function(text, x, y, callback, context, sprite, width, height, anchorX, anchorY, fontSize)
{
    var game = Brain.game;
    Phaser.Group.call(this, game);
    this.button = new Phaser.Button(game, x, y, sprite, callback, context, 1, 0, 1, 0);
    this.button.onInputOver.add(this.onOver, this);
    this.button.onInputDown.add(this.onDown, this);
    this.button.onInputOut.add(this.onOut, this);
    this.button.onInputUp.add(this.onUp, this);
    this.button.width = width* Brain.scaleRatio;
    this.button.height = height* Brain.scaleRatio;
    this.button.anchor.set(anchorX, anchorY);
    this.text = Brain.AddText(text, this.button.centerX, this.button.centerY, Color.white, fontSize, 0.5, 0.5, "normal", 1000, "LatoRegular");
    this.text.isEnabled = true;
    this.add(this.button);
    this.add(this.text);

    return this;
}

Brain.AddButton.prototype = Object.create(Phaser.Group.prototype);
Brain.AddButton.prototype.constructor = Brain.AddButton;
Brain.AddButton.prototype.onDown = function()
{
    this.text.addColor(Color.black, 0);
};

Brain.AddButton.prototype.onUp = function()
{
    this.text.addColor(Color.white, 0);
};

Brain.AddButton.prototype.onOver = function()
{
    console.log("over");
    this.text.addColor(Color.black, 0);
};

Brain.AddButton.prototype.onOut = function()
{
    this.text.addColor(Color.white, 0);
};

Spinner = function(x, y)
{
    var game = Brain.game;
    this.sprite = Brain.AddSprite("spinner", x, y, 100, 100, 0.5, 0.5);
    var tween = game.add.tween(this.sprite);
    tween.to({rotation: 3}, 1 * 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
    return this;
}

Spinner.prototype.Dismiss = function()
{
    this.sprite.destroy();
};