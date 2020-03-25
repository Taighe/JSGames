Brain.Title = function(game) 
{
	this.title = null;
	this.icon = null;
	this.instructions = null;
	this.shadow = null;
	this.index = 0;
	this.info = null;
	this.infoPanel = null;
	this.group = null;
	this.titleSize = null;
	this.instructionsSize = null;
	this.brainGame = null
};

Brain.Title.prototype = 
{
	init: function(brainGame)
	{
		this.index = 0
		this.title = brainGame.title;
		this.icon = brainGame.icon;
		this.instructions = brainGame.instructions;
		
		this.shadow = brainGame.shadow;
		this.size = brainGame.size;
		//this.info = brainGame.info;
		this.instructionsSize = brainGame.instructionsSize;
		this.titleSize = brainGame.titleSize;
		this.brainGame = brainGame
		Brain.brainGame = brainGame
		//this.instructionsText.align = "center";
	},

	create: function() 
	{		
		var game = Brain.game;
		var timer = game.time.events.add(Phaser.Timer.SECOND * 1, this.Setup, this);
		this.infoPanel = new InfoPanel(this.info, this.brainGame.infoSize);
		this.group = game.add.group();
	},
	Setup: function()
	{
	    var game = Brain.game;  
	    var topY = game.height *0.36;
	    var x = game.width / 2;
	    var bottomY = game.height - (game.height / 10);
	    var spacing = 50;	   
	    if(Brain.landscape)
	    {
	    	console.log("landscape")
	    	topY = game.height * 0.3
	    }

	    game.stage.backgroundColor = Color.white;

	    var graphic = Brain.AddSprite(this.icon, x, 0, this.size, this.size, 0.5, 0.5);
	    graphic.centerY = topY;
	    var shadowY = graphic.bottom + 35;
    	var shadow = Brain.AddSprite("shadow", x, shadowY, this.size * 1.3, this.size * 0.4, 0.5, 0.5);
	    
	    if(this.shadow == false)
	    {
    		graphic.centerY = game.height *0.45;
    		shadow.destroy();
    		shadow = Brain.AddSprite("", x, shadowY, this.size, 150, 0.5, 0.5);
	    }
	    else
	    {
			shadow.centerY = graphic.bottom + 50;
	    }

	    var titleText = Brain.AddText( this.title, x, 0, Color.lightPurple, this.titleSize, 0.5, 0.5, "bold", 900, "Arial");
	    titleText.top = game.height * 0.58;
	    titleText.wordWrap = false;

	    this.insText = Brain.AddText( "", x, 0, Color.gray, this.instructionsSize, 0.5, 0, "normal", 400);
	    this.insText.align = "center";
    	this.insText.top = titleText.bottom;
        var startGame = function()
	    {
	        game.state.start("Game", true, false,this.brainGame);
	    }

	    var button = new GenericButton( "START", 0, 0, startGame, this, 190, 70);
	    button.centerX = Brain.centerX;
	    button.centerY = game.height * 0.9;
		var timer = game.time.create(false);

    	timer.loop(7 * 1000, this.Instruct, this);
    	this.DisplayInstruct(this.instructions[this.index]);
	    timer.start();
	    this.group.add(shadow);
	    this.group.add(graphic);
	    this.group.add(this.insText);
     	this.group.add(button);
		this.group.add(this.infoPanel);
		this.group.add(titleText);
		
	},
	Instruct()
	{
		var game = Brain.game;
		if(this.instructions.length < 2)
			return
		
		this.DisplayInstruct(this.instructions[this.index]);
		this.index++;
		this.index = Wrap(this.index, 0, this.instructions.length - 1);
	},
	DisplayInstruct(text)
	{
		var game = Brain.game;
		if(typeof text == 'string')
		{
			this.insText.alpha =0 ;
			this.insText.text = text;

			var fade = Brain.TweenFade(this.insText, 1, true, 1, 0);

			return;
		}
		var timer = game.time.create(true);
		var obj =game.add.existing(text);


		obj.visible = true;
		obj.centerX = Brain.centerX;
		obj.top = this.insText.top;

		var free = function()
		{	
			obj.visible = false;
		};

		timer.add(5* 1000, free, this);
		timer.start();
		obj.alpha = 0;
		var fade = Brain.TweenFade(obj, 1, true, 1, 0);
		game.world.bringToTop(this.group);
	},

	getRandomInt(min, max) 
	{
		return Math.floor(Math.random() * (max - min)) + min;
	},

	update: function() 
	{

	},
	render: function() 
	{
		this.RenderDebugText();
	},

	RenderDebugText: function() 
	{
		if (this.isDebug) {
			this.game.debug.text("Snap pressed: " + this.snapPressed, 50, 50);
			this.game.debug.text("Snaps Correct: " + this.snapCorrect, 50, 100);
			this.game.debug.text("Current Cycle: " + this.currentCycle, 50, 150);
		}

	},

	gofull: function() 
	{
		if (this.scale.isFullScreen) 
		{
			this.scale.stopFullScreen();
			//this.fullscreenbutton.visible = true;
		} 
		else 
		{
			this.scale.startFullScreen(false);
			//this.fullscreenbutton.visible = false;
		}
	},
	DisplayInfo: function() 
	{

	},
	exitPress: function () 
	{
	    var game = Brain.game;
	    // Display API values
		console.log(Brain.GameId)
		console.log(Brain.GameProgress)
		console.log(Brain.NumberGamesPlayed)
		console.log(Brain.TopScore)
		console.log(Brain.LastLevelReached)
		console.log(Brain.LastTimeSetting)
		console.log(Brain.LastGameScore)
		console.log(Brain.TopStar)
		console.log(Brain.BreathingRate)
		console.log(Brain.Calmness)
		console.log(Brain.Date)
		console.log(Brain.Minutes)
		console.log("ending");
		var time = Math.round(game.time.now / 1000);
		Brain.Minutes = FormatTime(time);
		console.log(Brain.Minutes);
		this.exit();
	},

	unpause: function (event) {
	/*
	    if (event.game.paused == true) 
	    {
	        event.game.paused = false;
	    }*/
	},

test(){

  var SaveGameDetailsObject = {
	  UserName:Brain.game.net.getQueryString().username,
	  Password:Brain.game.net.getQueryString().password,
	  GameId:Brain.GameId,
      GameProgress:Brain.GameProgress,
	  NumberGamesPlayed:Brain.NumberGamesPlayed,
	  TopScore:Brain.TopScore,
	  LastLevelReached:Brain.LastLevelReached,
	  LastTimeSetting:Brain.LastTimeSetting,
	  LastGameScore:Brain.LastGameScore,
	  TopStar:Brain.TopStar,
	  BreathingRate:Brain.BreathingRate,
	  Calmness:Brain.Calmness,
	  Date:Brain.Date,
	  Minutes:Brain.Minutes
	  
	  };
  
  	console.log('Saving Game Data');
 return new Promise( (resolve, reject) => {
      fetch('http://40.126.244.210/api/Game/SaveGameData', {
        method: 'post',
        body: JSON.stringify(GetUserDetailsObject),
        headers: new Headers({'Content-Type': 'application/json'})
      })
      .then((response) => {
        if (response.status == 200) {
          console.log('GetUserDetails Successful');
              return response.json();
        } else {
          reject(response);
        }
      })
      .then((json) => {
        resolve(json);
      });
    })
	
},

	exit: function () 
	{	
	
//	var result = "";
 this.test().then( (result) => {
	    //window.location = this.exitURL;
         // "Stuff worked!"
        }, function(err) {
			    //window.location = this.exitURL;
          console.log(err); // Error: "It broke"
        });
		


	},
	info: function () 
	{
	    window.location = this.exitURL;
	},
	getRandomInt(min, max) 
	{
	    return Math.floor(Math.random() * (max - min)) + min;
	},


};