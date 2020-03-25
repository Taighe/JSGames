Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.timer;
	this.selected = null;
	this.duration = 61; // Duration of exercise in seconds
	this.screen = null
	this.pages = []
	this.pages["Game"] = null
	this.pages["Progress"] = null
	this.pages["Results"] = null
};

Brain.Game.prototype = 
{
	init: function(instructionsText, pages)
	{
		var game = Brain.game;
		this.ready = false;
		this.time = 0;
		this.bRate = 6;
		this.timeSettingValue = 0

		this.progressData = JSON.parse(localStorage.getItem("data"));
		console.log(this.progressData)
		if(this.progressData == null)
		{
			this.progressData = {Data: [] }
			localStorage.setItem("data", JSON.stringify(this.progressData));
		}

		if(pages == undefined || pages["Game"] == null)
		{
			console.log("init")

			this.infoPanel = new InfoPanel("HOW DO I TRAIN?\nThere are two good ways to train with MyCalmBeat: as a daily stress-prevention regimen, and to improve your stress and focus for specific events.  As part of a long-term stress-prevention regimen, it is recommended to train regularly for 10 minutes a day, at least 3 days per week. This is based on the latest research with this technique.  Benefits from a single 10 minute training session can last up to 48 hours. Because of this, training just before or during a stressful event can provide immediate improvements to your calmness and focus. Event-specific training like this is most effective when done in conjunction with a daily training regimen as suggested above.  The more you can train with MyCalmBeat, the bigger your benefit will be. Training will strengthen your automatic ‘calm reflexes’, and make them stronger – just like training a muscle. These reflexes will help you deal with stress more effectively, so if you want to train more, you should!\n\n  HOW DOES IT WORK?\n Your brain, heart, and breathing are all connected. When you breath rhythmically, you are training your nervous system, maximizing your Heart Rate Variability, and improving your calmness, focus, and sense of well-being.  Daily training at your Personal Best Breathing Rate will strengthen your body’s ‘calm reflexes’ – allowing you to deal with stress more effectively and become more resilient, flexible and adaptive.", 35);
			this.infoPanel.info.fontSize = 15
			this.progress = new MenuItem(this, 0, 0, this.CheckProgress, this, "CHECK PROGRESS", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 60, 18)
			this.progress.x = 15
			this.progress.y = 15
			this.progress.once = true;
			this.infoButton = new MenuItem(this, 0, 0, this.infoPanel.Display, this.infoPanel, "i", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 60, 60, 25, true)
			this.infoButton.right = game.width - 15
			this.infoButton.y = 15
			this.infoButton.once = true;
			this.cancel = new MenuItem(this, 0, 0, this.Cancel, this, "CANCEL", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 60, 18)
			this.cancel.x = 15
			this.cancel.y = 15
			this.cancel.once = true;
			this.title = Brain.AddText("Calm Relax Training Settings", 0, 0, Color.black, 28, 0.5, 0.5, "", 500, "LatoRegular");
			this.title.centerX = game.width * 0.5
			this.title.centerY = game.height * 0.15
			this.lungs = new Lungs(this);
			this.lungs.centerY =  game.height * 0.7
			this.lungs.scale.set(0.75)
			this.bRateT = Brain.AddText("Breaths/Min", 0, 0, Color.lightGray, 19, 0.5, 0.5, "bold", 500, "LatoRegular");
			this.bRateT.centerX = game.width * 0.5;
			this.bRateT.centerY = game.height * 0.32;
			this.bRateT.align = "center";
			this.bRateV = Brain.AddText(this.bRate, 0, 0, Color.lightPurple, 35, 0.5, 0.5, "bold", 500, "LatoRegular");
			this.bRateV.centerX = game.width * 0.5;
			this.bRateV.centerY = game.height * 0.37;
			this.play = new Phaser.Button(game, 0, 0, "play", this.Play, this);
			this.play.width = 60;
			this.play.height = 60;
			this.play.centerX = game.width * 0.65;
			this.play.centerY = game.height * 0.95;
			this.play.onInputDown.add(this.OnDown, this);
			this.play.onInputUp.add(this.OnUp, this);
			var size = 80;
			this.timeV = Brain.AddText("10:00", 0, 0, Color.lightGray, 35, 0.5, 0.5, "bold", 500, "LatoRegular");
			this.timeV.centerX = game.width * 0.5;
			this.timeV.centerY = game.height * 0.82;
			this.timeV.align = "center";
			this.durationText = Brain.AddText("Duration (Min)", 0, 0, Color.lightGray, 19, 0.5, 0.5, "bold", 500, "LatoRegular");
			this.durationText.centerX = game.width * 0.5;
			this.durationText.centerY = game.height * 0.2;
			this.durationText.align = "center";
			this.timeSetting = Brain.AddText("10:00", 0, 0, Color.lightPurple, 35, 0.5, 0.5, "bold", 500, "LatoRegular");
			this.timeSetting.centerX = game.width * 0.5;
			this.timeSetting.centerY = game.height * 0.25;
			this.timeSetting.align = "center";
			this.decrease = new Brain.AddButton("", this.bRateV.left - 70, this.bRateV.centerY, this.Decrease, this,"arrow_L", size, size, 0.5, 0.5, 1);
			this.increase = new Brain.AddButton("", this.bRateV.right + 70, this.bRateV.centerY, this.Increase, this, "arrow_R", size, size, 0.5, 0.5, 1);
			this.dTime = new Brain.AddButton("", this.timeSetting.left - 60, this.timeSetting.centerY, this.DecreaseTime, this,"arrow_L", size, size, 0.5, 0.5, 1);
			this.iTime = new Brain.AddButton("", this.timeSetting.right + 60, this.timeSetting.centerY, this.IncreaseTime, this, "arrow_R", size, size, 0.5, 0.5, 1);
			this.stop = new Brain.AddButton("", this.play.right + 55, this.play.centerY, this.Init, this, "stop", 60, 60, 0.5, 0.5, 1);
			this.start = new GenericButton("BEGIN", 0, 0, this.Start, this, 190, 75);
			this.start.centerX = Brain.centerX;
			this.start.centerY = game.height * 0.9;
			this.play.visible = false;

			this.screen = new Phaser.Group(game);
			this.screen.add(this.title)
			this.screen.add(this.lungs)
			this.screen.add(this.title)
			this.screen.add(this.bRateT)
			this.screen.add(this.bRateV)
			this.screen.add(this.timeV)
			this.screen.add(this.durationText)
			this.screen.add(this.timeSetting)
			this.screen.add(this.decrease)
			this.screen.add(this.increase)
			this.screen.add(this.dTime)
			this.screen.add(this.iTime)
			this.screen.add(this.stop)
			this.screen.add(this.start)
			this.screen.add(this.progress)
			this.screen.add(this.cancel)
			this.screen.add(this.infoButton)
			this.screen.add(this.infoPanel)
			this.cancel.visible = false;
			this.pages["Game"] = this.screen;
		}


	},
	create: function() 
	{
		var game =Brain.game
		this.screen.visible = true
		this.lungs.Init();
		this.ready = false;
		this.time = 0;
		this.lungs.pause = true;
		this.play.frame = 2;
		this.play.visible = false;
		this.start.visible = true;
		this.increase.visible = true;
		this.decrease.visible = true;
		this.stop.visible = false;
		this.timeSetting.visible = true
		this.bRateT.visible = true
		this.durationText.visible = true
		this.bRateV.visible = true
		this.dTime.visible = true;
		this.iTime.visible = true;
		this.lungs.scale.set(0.75)
		this.timeV.centerY = game.height * 0.82
		this.lungs.Init(this.bRate);
		this.timeV.scale.set(1)
	},
	OnDown: function()
	{		
		var game = Brain.game;
		if(this.lungs.pause == true)
		{
			this.play.frame = 3;
		}

		if(this.lungs.pause == false)
		{
			this.play.frame = 1;
		}
	},
	Start: function()
	{		
		var game = Brain.game;
		this.ready = true;
		this.start.visible = false;
		this.Play();
		this.play.frame = 0;
		this.play.visible = true;
		this.decrease.visible = false;
		this.increase.visible = false;
		this.dTime.visible = false;
		this.iTime.visible = false;
		this.bRateV.visible = false
		this.timeSetting.visible = false
		this.bRateT.visible = false
		this.durationText.visible = false
		this.stop.visible = true;
		this.lungs.scale.set(1.3)
		this.timeV.centerY = game.height * 0.95
		this.timeV.scale.set(1.2)
		this.lungs.Start()

	},
	Increase: function()
	{		
		var game = Brain.game;
		this.bRate += 0.5;
		this.lungs.Init(this.bRate);
	},
	Decrease: function()
	{		
		var game = Brain.game;
		this.bRate -= 0.5;
		this.lungs.Init(this.bRate);
	},
	IncreaseTime: function()
	{		
		var game = Brain.game;
		this.time += 1 * 60;
		this.timeSettingValue = this.time
	},
	DecreaseTime: function()
	{		
		var game = Brain.game;
		this.time -= 1 * 60;
		
	},
	OnUp: function()
	{		
		var game = Brain.game;
		if(this.lungs.pause == true)
		{
			this.play.frame = 2;
		}

		if(this.lungs.pause == false)
		{
			this.play.frame = 0;
		}
	},
	Play: function()
	{
		this.lungs.Play();

	},
	update: function()
	{
		var game = Brain.game;
		var dt = game.time.elapsedMS / 1000;
		this.title.text = "Training"
		this.cancel.visible = true;
		this.progress.visible = false;
		var timeF = FormatTime(this.time);
		console.log(timeF)
		if(this.ready == false)
		{
			this.cancel.visible = false;
			this.progress.visible = true;
			this.bRate = MinMax(this.bRate, 4, 7);
			var rate = this.bRate.toFixed(1)
			this.bRateV.text = rate;
			this.time = MinMax(this.time, 60, 10 * 60);	
			this.title.text = "Calm Relax Training Settings"
			this.timeSetting.text = timeF
			this.timeSettingValue = this.time
		}
		
		if(this.time <= 0)
		{
			this.screen.visible = false
			game.state.start("Results", false, false, this.pages, this.timeSettingValue, this.progressData)
		}
		if(this.lungs.pause == false)
		{
			this.time -= 1 * dt;
		}
		
		this.timeV.text = timeF;

	},
	CheckProgress: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		game.state.start("Progress", false, false, this.pages, this.progressData);
	},
	Cancel: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		game.state.start("Game", false, false, "", this.pages);
	},
	Finished: function()
	{
		var game = Brain.game;
		this.screen.visible = false
		game.state.start("Game", false, false, "", this.pages);
	},
	unpause: function (event) 
	{
	    if (event.game.paused == true) 
	    {
	        event.game.paused = false;
	    }
	},

	exit: function () 
	{
	    window.location = this.exitURL;
	},
}





