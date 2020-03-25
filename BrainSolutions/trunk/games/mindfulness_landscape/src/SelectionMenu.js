Brain.Menu = function(title, subtitle, background, audio, audioPath)
{
    this.Title = title;
    this.SubTitle = subtitle;
    Brain.background = background;
    Brain.music = audio;
    this.audioPath = audioPath;
}

SelectionMenu =
{
    menu: null,
    exercise: null,
    duration: null,
    items: null,
    menuTree: []
};

SelectionMenu.Init = function()
{
    var game = Brain.game;
    Brain.bgMusic.fadeTo(1* 1000, 1);
    this.timer = game.time.create(true);
    var group = game.add.group();
    var step = Brain.AddText("STEP 1: Select a meditation session", game.width / 2, game.width / 15, Color.white, 26, 0.5, 0.5, "normal", 800, "LatoRegular");
    step.addColor(Color.lightGray, 7);
    var lineSprite = Brain.AddSprite("whitePix", game.width / 2, step.centerY + step.height, game.width, 1, 0.5, 0.5, false);

    var back = Brain.AddSprite("whitePix", 0, 0, game.width, game.height, 0, 0, false);
    back.tint = Brain.black;
    
    var background = game.add.group();
    background.add(back);
    background.alpha = 0;
    step.alpha = 0;
    Brain.TweenFade(background, 0.5, true, 1, 0);
    Brain.TweenFade(step, 1, true, 1, 0);

    // Setup menu Items
    SelectionMenu.items = game.add.group();
    SelectionMenu.items.inputEnableChildren = true;
    SelectionMenu.items.y = lineSprite.centerY + 30;
    this.timer.add(0.2 * 1000, SelectionMenu.AddMenuItem, this, "SLOW BREATHING", "Relaxation and awareness of your breath", "bg2", "music1", 'assets/audio/SlowBreathing.mp3');
    this.timer.add(0.4 * 1000, SelectionMenu.AddMenuItem, this,"EXPANDING AWARNESS", "Awareness of your surroundings and internal thoughts", "bg3", "music2",'assets/audio/ExpandingAwareness.mp3');
    this.timer.add(0.6 * 1000, SelectionMenu.AddMenuItem, this,"FOCUSED ATTENTION", "Focusing your attention on a single object", "bg4", "music3",'assets/audio/FocusedAttention.mp3');
    this.timer.add(0.8 * 1000, SelectionMenu.AddMenuItem, this,"OPEN ATTENTION", "Your open attention to each moment", "bg5", "music4",'assets/audio/OpenAttention.mp3');
    this.timer.add(1 * 1000, SelectionMenu.AddMenuItem, this,"THOUGHTS", "Your thoughts and controlling them", "bg6", "music5",'assets/audio/Thoughts.mp3');
    this.timer.add(1.2 * 1000, SelectionMenu.AddMenuItem, this,"IMAGERY", "Your visualization and positive immersion", "bg7", "music6",'assets/audio/Imagery.mp3');
    this.timer.add(1.4 * 1000, SelectionMenu.AddMenuItem, this,"POSITIVE AFFIRMATION", "Tuning in to your positive thoughts and experiences", "bg8", "music7",'assets/audio/PositiveAffirmation.mp3');
    //

    group.add(background);
    group.add(step);
    group.add(lineSprite);

    SelectionMenu.menu = group;
    this.timer.start();
    Brain.TweenLineIn(lineSprite, lineSprite.width, lineSprite.height);
}

SelectionMenu.AddMenuItem = function(title, subtitle, background, audio, audioPath)
{    
    var game = Brain.game;
    var item = game.add.group();
    item.inputEnableChildren = true;
    var changeScreen = function()
    {
        game.state.start("TimeSelection");
    }

    var click = function()
    {
        console.log("Clicked");
        console.log(title);
        SelectionMenu.AddMenu(new Brain.Menu(title, subtitle, background, audio, audioPath));
        changeScreen();

        game.input.enabled = false;
    }
    this.button = new Brain.AddButton("", game.width * 0.3, SelectionMenu.items.total * 70, click, this, "playButton", 50, 50, 0.5, 0, 15);
    this.titleSprite = Brain.AddText(title, this.button.right + 10, SelectionMenu.items.total * 70, Color.white, 22, 0, 0, "normal", 800, "LatoRegular");
    this.titleSprite.events = this.button.button.events;
    this.subSprite = Brain.AddText(subtitle, this.button.right + 10, this.titleSprite.centerY + 10, Color.lightGray, 18, 0, 0, "normal", 800, "LatoRegular");
    this.subSprite.events = this.button.button.events;
    item.add(this.button);
    item.add(this.titleSprite);
    item.add(this.subSprite);
    Brain.TweenIn(item, item.centerY);
    SelectionMenu.items.add(item);
}

SelectionMenu.AddMenu = function(menu)
{
    SelectionMenu.menuTree.push(menu);
}

SelectionMenu.PopMenu = function()
{
    SelectionMenu.menuTree.pop();
}

SelectionMenu.DisplayTopMenu = function()
{
    return SelectionMenu.menuTree[0];
}

SelectionMenu.Update = function() 
{

}

SelectionMenu.Free = function()
{
    SelectionMenu.menu.destroy();
}