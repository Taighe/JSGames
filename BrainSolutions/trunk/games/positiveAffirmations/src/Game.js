Brain.Game = function() 
{
	this.isDebug;
	this.gameReady = false;
	this.correct = false;
	this.initialized = false;
	this.persistant = null;
	this.affirmations = null;
	this.page = 0;
	this.maxPages = 0;
	this.leftButton = null;
	this.rightButton = null;
	this.group = null;
	this.myAffirmations = []
	this.screen = null
	this.select =null
	this.all = []
	this.con= []
	this.hea = []
	this.posi = []
	this.rel = []
	this.stress = []
	this.work = []
};

Brain.Game.prototype = 
{

	init: function(instructions)
	{
		var game = Brain.game;
		if(this.initialized == false)
		{
			var json = game.cache.getJSON("presets");
			
			this.screen = new Phaser.Group(game)
			this.title = Brain.AddText("Select an affirmation below to practise.", 0, 0, Color.black, 28, 0, 0, "normal", 400, "LatoRegular");
			this.title.centerX = game.width * 0.5
			this.title.centerY = game.height * 0.2
			this.newAff = new MenuItem(this, 0, 0, this.NewAffirmation, this, "NEW AFFIRMATION", Color.purpleHex, Color.lightGrayHex, Color.white, Color.lightGray, 200, 70, 18)
			this.newAff.left = 15
			this.newAff.top = 15
			this.newAff.once = true
			this.fade = game.add.sprite(0, 0, "whitePix");
			this.group = new Phaser.Group(game)
			var category = json.Affirmations.Confidence
			for(i=0; i < category.length; i++)
			{
				var aff = new Affirmation(0, 0, 300, 300, this.Edit, this, category[i]);
				aff.edited = true
				aff.visible = false
				this.all.push(aff)
				this.con.push(aff)
				this.group.add(aff)
			}
			var category = json.Affirmations.Positivity
			for(i=0; i < category.length; i++)
			{
				var aff = new Affirmation(0, 0, 300, 300, this.Edit, this, category[i]);
				aff.visible = false
				aff.edited = true
				this.all.push(aff)
				this.posi.push(aff)
				this.group.add(aff)
			}
			var category = json.Affirmations.Relationships
			for(i=0; i < category.length; i++)
			{
				var aff = new Affirmation(0, 0, 300, 300, this.Edit, this, category[i]);
				aff.visible = false
				aff.edited = true
				this.all.push(aff)
				this.rel.push(aff)
				this.group.add(aff)
			}
			var category = json.Affirmations.Health
			for(i=0; i < category.length; i++)
			{
				var aff = new Affirmation(0, 0, 300, 300, this.Edit, this, category[i]);
				aff.visible = false
				aff.edited = true
				this.all.push(aff)
				this.hea.push(aff)
				this.group.add(aff)
			}
			var category = json.Affirmations.Stress
			for(i=0; i < category.length; i++)
			{
				var aff = new Affirmation(0, 0, 300, 300, this.Edit, this, category[i]);
				aff.visible = false
				aff.edited = true
				this.all.push(aff)
				this.stress.push(aff)
				this.group.add(aff)
			}
			var category = json.Affirmations.Work
			for(i=0; i < category.length; i++)
			{
				var aff = new Affirmation(0, 0, 300, 300, this.Edit, this, category[i]);
				aff.visible = false
				aff.edited = true
				this.all.push(aff)
				this.work.push(aff)
				this.group.add(aff)
			}

			this.myAffirmations = this.all
			this.group.centerX = game.width * 0.5
			this.group.centerY = game.height * 0.6

			this.initialized = true;
			this.rightButton = new Button("", "arrow_R", Color.white, Color.purpleHex, Color.purpleHex, this.RightArrow, this, game.width * 0.8, game.height *0.75, 60, 60);
			this.leftButton = new Button("", "arrow_L",Color.white, Color.purpleHex, Color.purpleHex, this.LeftArrow, this, game.width * 0.2, game.height *0.75, 60, 60);
			// Category buttons
			var group1 = new Phaser.Group(game)
			var group2 = new Phaser.Group(game)
			var fontSize = 28
			
			var all = new MenuItem(this, 0, 0, this.ChangeCategory, this, "All", Color.whiteHex, Color.whiteHex, Color.purple, Color.lightGray, 100, 70, fontSize, this.all)
			group1.add(all)
			var confidence = new MenuItem(this, all.right + 50, 0, this.ChangeCategory, this, "Confidence", Color.whiteHex, Color.whiteHex, Color.purple, Color.lightGray, 100, 70, fontSize, this.con)
			group1.add(confidence)
			var health = new MenuItem(this, confidence.right + 50, 0, this.ChangeCategory, this, "Health", Color.whiteHex, Color.whiteHex, Color.purple, Color.lightGray, 100, 70, fontSize, this.hea)
			group1.add(health)
			var positive = new MenuItem(this, health.right + 50, 0, this.ChangeCategory, this, "Positivity", Color.whiteHex, Color.whiteHex, Color.purple, Color.lightGray, 100, 70, fontSize, this.posi)
			group1.add(positive)
			var relation = new MenuItem(this, 0, 0, this.ChangeCategory, this, "Relationships", Color.whiteHex, Color.whiteHex, Color.purple, Color.lightGray, 100, 70, fontSize, this.rel)
			group2.add(relation)
			var stress = new MenuItem(this, relation.right + 50, 0, this.ChangeCategory, this, "Stress", Color.whiteHex, Color.whiteHex, Color.purple, Color.lightGray, 100, 70, fontSize, this.stress)
			group2.add(stress)
			var work = new MenuItem(this, stress.right + 25, 0, this.ChangeCategory, this, "Work", Color.whiteHex, Color.whiteHex, Color.purple, Color.lightGray, 100, 70, fontSize, this.work)
			group2.add(work)
			
			group1.align(4, 1, 150, 50, Phaser.CENTER)
			group2.align(3, 1, 150, 50, Phaser.CENTER)
			group1.centerY = game.height * 0.9
			group2.centerX = game.width * 0.5
			group2.centerY = game.height * 0.95
			this.screen.add(this.leftButton)
			this.screen.add(this.rightButton)

			this.screen.add(this.title)
			this.screen.add(this.newAff)
			this.screen.add(group1)
			this.screen.add(group2)
			this.selected = this.all
		}

		var array = this.myAffirmations.slice(0,3);
		this.DisplayPage(array, this.group);
	},
	create: function() 
	{
		console.log("Game Created");
		this.screen.visible = true
		var game = Brain.game;
		this.maxPages = parseInt(this.myAffirmations.length / 3);
		this.page = 0;
		console.log(this.maxPages);
	},
	Resize: function()
	{
		this.group.removeAll(false)
		this.DisplayPage(this.affirmations, this.group);
	},
	LeftArrow: function()
	{
		var game = Brain.game;
		this.page--
		var currentpage = this.page * 3
		var array = this.myAffirmations.slice(currentpage, currentpage + 3);
		this.DisplayPage(array, this.group)

	},
	RightArrow: function()
	{
		var game = Brain.game;
		this.page++;
		var currentpage = this.page * 3
		var array = this.myAffirmations.slice(currentpage, currentpage + 3);
		this.DisplayPage(array, this.group)
	},
	NewAffirmation: function()
	{
		var game = Brain.game;
        var doc = document.getElementById("hiddenInput");
        doc.value = ""
		var aff = new Affirmation(this.group.centerX, this.group.centerY + 1000, 300, 300, this.Edit, this, "write your positive affirmation here...");
		aff.visible = false	
		this.myAffirmations.push(aff)
		var length = this.myAffirmations.length
		aff.id = length - 1
		this.group.add(this.myAffirmations[aff.id])
		this.maxPages = parseInt(this.myAffirmations.length / 3);
		var currentPage = this.page * 3
		var array = this.myAffirmations.slice(currentPage, currentPage + 3);
		this.DisplayPage(array, this.group);
		this.screen.visible = false
		game.state.start("Edit", false, false, aff, this.myAffirmations, this.group);
	},
	ChangeCategory: function(array)
	{
		this.myAffirmations = array
		this.maxPages = parseInt(this.myAffirmations.length / 3);
		this.page = 0
		var array = this.myAffirmations.slice(0,3);
		this.DisplayPage(array, this.group);
	},
	DisplayPage: function(array, group)
	{
		var game = Brain.game;
		console.log(array)
		group.callAll("Visible", null, false)
		var left = true
		var length = MinMax(array.length, 0, 3)
		var scale = 0.75 - 0.15 * length / 3

		for(i = 0; i < length; i++)
		{
			var aff = array[i];
			aff.scale.set(scale)
			left = !left
			var rand = GetRandomFloat(0, 10, game)
			if(left)
				rand = GetRandomFloat(-10, 0, game)
			aff.angle = rand
			var posX = 70 - i * 10
			
			if(left)
				posX = -70 + i * 10

			aff.x = posX;
			aff.y = i * 160;
			aff.visible = true
			aff.SelectMode(true)
		}

		group.centerX = game.width * 0.5;
		group.centerY = game.height * 0.55;
	},
	update: function() 
	{
		this.rightButton.Enable(true);
		this.leftButton.Enable(true);
		if(this.page <= 0)
		{
			this.leftButton.Enable(false);
		}
		if(this.page >= this.maxPages )
		{
			this.rightButton.Enable(false);
		}
	},
	ExerciseEnd: function()
	{
		var game = Brain.game;
	},
	Edit: function (affirmation)
	{
		var game = Brain.game;
		this.screen.visible = false
		game.state.start("Practice", false, false, affirmation, this.myAffirmations, this.group);
	},
	Fade: function()
	{
		var game = Brain.game;
		console.log("fade");
		this.fade.width = game.width;
		this.fade.height = game.height;
		this.fade.alpha = 1;
		var fade = game.add.tween(this.fade);
		fade.to({alpha: 0}, 0.5*1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		this.fade.bringToTop();
	},
	Game: function()
	{
		var game = Brain.game;
		game.state.start("Game", false, false)
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
};