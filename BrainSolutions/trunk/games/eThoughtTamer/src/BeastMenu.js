BeastMenu = function (manager, exercise)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	this.exercise = exercise;
	this.manager =manager;
	this.feeling = "";
	this.feelings = ["Afraid", "Angry", "Annoyed", "Anxious", "Ashamed", "Bitter", "Confused", "Contempt", "Depressed", "Disappointed", "Disgusted", "Distress", "Empty", "Envy", "Frightened", "Frustrated" ,"Fuming", "Fury", "Grief", "Hopeless", "Hostile", "Hurt", "Inferior", "Jealous", "Lonely", "Miserable", "Nervous", "Offended", "Pain", "Panic", "Pessimistic", "Rage", "Regret", "Rejected", "Resentful", "Revulsion", "Sad", "Scared", "Shocked", "Spiteful", "Sulky", "Tearful", "Tense", "Uneasy", "Unhappy", "Upset", "Useless", "Vulnerable", "Worried"]

	var graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.greenHex);
	graphics.drawCircle(0, 0, 200);
	var arrowT = graphics.generateTexture();
	var ground = this.manager.ground;

	this.currentThought = ""
	this.feelingStrength = 2;
	this.beasts = [];
	this.leftArrow2 = new Brain.AddButton("", game.width * 0.07, game.height * 0.45, this.LeftArrow2, this, "arrow_L", 50, 50, 0.5, 0.5, 1);
	this.rightArrow2 = new Brain.AddButton("", game.width * 0.93, game.height * 0.45, this.RightArrow2, this, "arrow_R", 50, 50, 0.5, 0.5, 1);
	this.add(this.manager.ground);
	this.leftArrow = new Brain.AddButton("", game.width * 0.3, game.height * 0.7, this.LeftArrow, this, "arrow_L", 50, 50, 0.5, 0.5, 1);
	this.rightArrow = new Brain.AddButton("", game.width * 0.7, game.height * 0.7, this.RightArrow, this, "arrow_R", 50, 50, 0.5, 0.5, 1);
	var pos = new Vector(600 * Math.sin(0), 600 * Math.cos(0));
	this.beasts.push(new Beast(this, pos.x, -pos.y, "beastCAT", "Beast-Catastrophizing-", "Catastrophizing", 0, ["Everytime I go out to eat. I get food poisoning. I probably have a ton of allergies.", "Last time I spoke in public I stutterd. If I speak out again people will laugh at me", "The plane is going to crash and I'll never see my family again.", "I got sick last time I whent on vacation and this time I'll probably get the flu.", "I just want to catch a break and I seem to have terrible luck"]));
	this.beasts[0].anchor.set(0.5, 1);
	this.add(this.beasts[0]);
	var a = Phaser.Math.degToRad(25);
	pos = new Vector(680 * Math.sin(a), 680 * Math.cos(a));
	this.beasts.push(new Beast(this, pos.x, -pos.y, "beastBW", "Beast-Black-White-", "Black and White Thinking", 25, ["It will always be this way. I'll have to quit and leave or always suffer.", "Things are always going to be this bad for me.", "If I don't get healthy soon I'll never be healthy.", "I'm never going to be good enough.", "Life is always brining me down."]));
	this.add(this.beasts[1]);
	a = Phaser.Math.degToRad(50);
	pos = new Vector(680 * Math.sin(a), 680 * Math.cos(a));
	this.beasts.push(new Beast(this, pos.x, -pos.y, "beastOG", "Beast-OverGeneralizing-", "Over-Generalizing", 50, ["I got in a car accident before. If I drive, I'm going to get hit again.", "I'm always the one that gets dumped in my relationships.", "I'll never be able to retire if I don't save more money.", "He / she broke my confidence once and I doubt if I can trust him / her again.", "I didn't get the job. I'm probably never going to find a job."]));
	this.add(this.beasts[2]);
	a = Phaser.Math.degToRad(75);
	pos = new Vector(600 * Math.sin(a), 600 * Math.cos(a));
	this.beasts.push(new Beast(this, pos.x, -pos.y, "beastJTC", "Beast-JumpingToConclusions-", "Jumping to Conclusions", 75, ["I know I'll lose my job.", "If I don't change who I am I will never be satisfied with my life.", "If I don't study harder I will flunk out of school.", "I'm going to get fired because I'm always late to work.", "I gained 5 pounds and now I'll be fat forever."]));
	this.beasts[3].anchor.set(0.5, 1);
	this.add(this.beasts[3]);
	a = Phaser.Math.degToRad(100);
	pos = new Vector(680 * Math.sin(a), 680 * Math.cos(a));
	this.beasts.push(new Beast(this, pos.x, -pos.y, "beastSH", "Beast-Should-", "Should Statements", 100, ["I should have visited my mother more in the nursing home before she died.", "I really should have kept up with my workout routine. Now I'm out of shape.", "I shouldn't have gotten so angry. Next time I may not be able to control myself as much.", "I should have invested my money better. Now I may not have enough to accomplish my goals.", "I should have expressed my empathy towards my partner. Now our relationship is suffering."]));
	this.add(this.beasts[4]);
	this.title = Brain.AddText("You may need to speak with someone about your thought.", game.width * 0.55, game.height * 0.2, Color.black, 25, 0.5, 0, "bold", 400, "LatoRegular");
	this.body = Brain.AddText("Adverse situtions and negative feelings can't be avoided. But as you train to develop productive Thinking habits, you can minimize negative feelings and maximize positive feelings when facing adverse situations", game.width * 0.6, game.height * 0.3, Color.black, 18, 0.5, 0, "normal", 400, "LatoRegular");
	this.title.visible  =false;
	this.body.visible  =false;
	this.textBox = new TextBox(this.exercise, this.manager);
	this.textBox.centerX = game.width * 0.65;
	this.textBox.centerY = game.height * 0.3;
	this.scrollBox = new ScrollBox(this, this.exercise, game.width * 0.7, game.height* 0.4, this.feelings, true, this.Step3, this);
	this.sliderBar = new RatingOption("You indicated that your feeling is " + this.manager.feeling + "." + "How strong is this feeling?", Brain.centerX, game.height* 0.4);
	this.selected = this.beast;

	this.selectButton = new GenericButton("Select This Thought", Brain.centerX, game.height, this.SelectThought, this, 300, 50);
	this.selectButton.centerX = Brain.centerX;
	this.selectButton.centerY = game.height * 0.95;
	this.name = Brain.AddText("", Brain.centerX, game.height * 0.87, Color.lightGray, 25, 0.5, 0.5, "normal", 400, "LatoRegular");
	game.add.existing(this);
	this.index = 2;
	this.next = new GenericButton("Continue", game.width * 1, game.height * 1, null, null, 200, 80);
	this.next.visible = false;

	this.blankMessage = "Ooops! You have left this blank!"
	return this;
};

BeastMenu.prototype = Object.create(Phaser.Group.prototype);
BeastMenu.prototype.constructor = BeastMenu;

BeastMenu.prototype.Init = function()
{		
	var game = Brain.game;
	var doc = document.getElementById("hiddenInput");
	doc.value = ""
	this.index = 2;
	this.title.visible = false;
	this.body.visible = false;
	var currentAngle = this.index * 25;
	var tween = game.add.tween(this);
	tween.to({centerX: Brain.centerX, angle: -currentAngle}, 0.2*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	this.name.text = this.beasts[this.index].name;
	this.leftArrow.visible = false;
	this.rightArrow.visible = false;
	this.name.visible = false;
	this.selectButton.visible = false;
	this.manager.ground.visible = true;
	this.scrollBox.Init("How does this thought make you feel?");
	this.ShowBeasts(false);
	this.textBox.Display(false);
	this.scrollBox.Display(false);
	this.sliderBar.Display(false);
	this.manager.thought.Init();
	this.next.visible = false;
	this.leftArrow2.visible = false;
	this.rightArrow2.visible = false;
	var tween = game.add.tween(this);
	tween.to({centerX: Brain.centerX }, 0.5*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	this.currentThought = this.beasts[this.index].GetThought();
}

BeastMenu.prototype.Display = function(visible)
{
	this.leftArrow.visible = visible;
	this.rightArrow.visible = visible;
	this.name.visible = visible;
	this.selectButton.visible = visible;
	this.ShowBeasts(visible);
}

BeastMenu.prototype.SelectThought = function()
{
	var game = Brain.game;
	this.manager.topMenu.Init();

	this.Step1();
}

BeastMenu.prototype.SetCallback = function(callback, context, text, width)
{
	var game = Brain.game;
	this.next.children[0].width = width
	this.next.children[1].width = width

	this.next.children[1].onInputDown.removeAll();
	this.next.children[1].onInputDown.add(callback, context);
	this.next.children[2].text = text;
	this.next.children[0].centerX = 0
	this.next.children[1].centerX = 0
}

BeastMenu.prototype.Step1 = function()
{
	var game = Brain.game;
	this.leftArrow2.visible = false;
	this.rightArrow2.visible = false;
	this.Display(false);
	this.manager.DisplayMenu(false)
	this.textBox.centerX = game.width * 0.65;

	var tweenThought = game.add.tween( this.manager.thought);
	tweenThought.to({centerX: 150, centerY: 550 }, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	var thoughtScale = game.add.tween( this.manager.thought.scale);
	thoughtScale.to({x: 0.4, y: 0.4}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	this.beasts[this.index].visible = true;
	this.textBox.Init("Describe your thought", this.Step2, this, "(Type here to describe your thought)", this.blankMessage + " Please type here to describe your thought");
	this.textBox.Display(true);
	var tween = game.add.tween(this);
	tween.to({centerX: 100}, 0.5*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	this.next.visible = true;
	this.next.centerX = game.width * 0.5;
	this.next.centerY = game.height * 0.9;
	this.beasts[this.index].Deselect();
}

BeastMenu.prototype.Step2 = function()
{
	var game = Brain.game;
	this.manager.thought.Display(true);
	var tweenThought = game.add.tween( this.manager.thought);
	tweenThought.to({centerX: 150, centerY: 550 }, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	this.scrollBox.Display(true);
	this.textBox.Display(false);
	this.next.visible = false;
	var doc = document.getElementById("hiddenInput");
	this.currentThought = doc.value;
	this.manager.topMenu.info.text = "Describe your negative thought";

}

BeastMenu.prototype.Step3 = function()
{
	var game = Brain.game;
	this.scrollBox.Display(false);
	this.textBox.Display(false);
	
	this.sliderBar.Init();
	this.sliderBar.Display(true);
	this.sliderBar.scale.set(0.7)
	this.sliderBar.centerX  = game.width * 0.5;
	this.sliderBar.centerY  = game.height * 0.3;
	this.SetCallback(this.Step4, this, "Continue", 200);
	this.sliderBar.message.text = "You indicated that your feeling is " + this.feeling + ". " + "How strong is this feeling?"
	this.next.visible = true;
	this.manager.topMenu.info.text = "Rate your negative thought";
}

BeastMenu.prototype.Step4 = function()
{
	var game = Brain.game;
	this.feelingStrength = this.sliderBar.GetValue()
	this.sliderBar.Display(false);
	this.manager.topMenu.info.text = "This thought is making you feel " + this.feeling;
	this.next.centerX = game.width * 0.5;
	this.next.centerY = game.height * 0.9;
	this.next.children[0].width = 250;
	var tweenThought = game.add.tween( this.manager.thought);
	tweenThought.to({centerX: Brain.centerX}, 0.5 * 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
	var tween = game.add.tween(this);
	tween.to({centerX: Brain.centerX }, 0.5*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	this.SetCallback(this.Step5, this, "Tame This Thought!", 400);
	this.next.centerX = game.width * 0.5;
	this.next.centerY = game.height * 0.9;
	this.beasts[this.index].Selected();
}

BeastMenu.prototype.Step5 = function()
{
	var game = Brain.game;
	this.sliderBar.Display(false);
	this.manager.thought.visible = false;
	this.manager.topMenu.info.text = "List facts that support your thought";
	this.textBox.Init("So, tell us, are there any facts that support your thought?", this.Step6, this, "(Type a list here of facts that support your thought)", this.blankMessage + " Please type a list here of facts that support your thought", "");
	this.textBox.centerX = game.width * 0.5;
	this.manager.thought.Display(false);
	this.textBox.Display(true);
	this.next.visible =false;
	this.manager.ground.visible = false;
	
	this.beasts[this.index].Wild();
}

BeastMenu.prototype.Step6 = function()
{
	var game = Brain.game;
	this.manager.topMenu.info.text = "List facts that DON'T support your thought";
	this.textBox.Init("Surely, there are reasons why this thought is not true...", this.Step7, this, "(Make a list of facts that disprove your thought)" , this.blankMessage + " Please type a list here of facts that disprove your thought", "");
	this.textBox.Display(true);
	this.next.visible =false;
}

BeastMenu.prototype.Step7 = function()
{
	var game = Brain.game;
	this.manager.topMenu.info.text = "Create a new positive thought";
	this.textBox.Init("Now, create an alternative positive thought:",  this.Step8, this, "(Type a positive thought)" , this.blankMessage + " Please type a positive thought", "");
	this.textBox.Display(true);
	this.next.visible =false;

}

BeastMenu.prototype.Step8 = function()
{
	var game = Brain.game;
	this.manager.topMenu.info.text = "Create a new positive thought";
	this.sliderBar.Init();
	this.textBox.Display(false);
	this.sliderBar.Display(true);
	this.beasts[this.index].PositiveStand();
	
	this.SetCallback(this.Step9, this, "Continue", 200);
	this.next.visible =true;
	this.centerY = 3000
	this.manager.ground.visible = true;
	var tween = game.add.tween(this);
	tween.to({centerX: 100, centerY: 1300}, 0.5*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
}

BeastMenu.prototype.Step9 = function()
{
	var game = Brain.game;

	if(this.sliderBar.index > this.feelingStrength)
	{
		this.manager.topMenu.info.text = "Your thought is a tough cookie";
		this.title.text = "You may need to speak with someone about your thought.";
	}
	else if(this.sliderBar.index == this.feelingStrength)
	{
		this.manager.topMenu.info.text = "It could be worse";
		this.title.text = "Your feeling of " + this.feeling + " is about the same.";
	}
	else if(this.sliderBar.index < this.feelingStrength)
	{
		var percent = Math.round(100 * (1 - (this.sliderBar.index + 1) / (this.feelingStrength + 1)) );
		console.log(percent)
		this.manager.topMenu.info.text = "Great Job! You have tamed a negative thought";
		this.title.text = "Your feeling of " + this.feeling + " has been reduced by " + percent + "%!" ;

	}
	this.title.visible  =true;
	this.body.visible  =true;

	this.sliderBar.Display(false);
	this.textBox.Display(false);
	this.sliderBar.Display(false);
	this.next.visible =true;
	this.SetCallback(this.manager.Init, this.manager, "Challenge Another Thought", 400);
	var tween = game.add.tween(this);
	tween.to({centerX: 100 }, 0.5*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
}

BeastMenu.prototype.ShowBeasts = function(visible)
{
	for(i=0;i < this.beasts.length; i++)
	{
		this.beasts[i].visible = visible;
	}
	this.beasts[this.index].Selected();
}

BeastMenu.prototype.LeftArrow = function()
{
	var game = Brain.game;
	this.beasts[this.index].Deselect();
	this.index--;
	this.index = MinMax(this.index, 0, 4);
	var currentAngle = this.index * 25;
	var tween = game.add.tween(this);
	tween.to({angle: -currentAngle}, 0.2*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	this.name.text = this.beasts[this.index].name;
	this.currentThought = this.beasts[this.index].GetThought();
	this.beasts[this.index].Selected();
}

BeastMenu.prototype.RightArrow = function()
{
	var game = Brain.game;
	this.beasts[this.index].Deselect();
	this.index++;
	this.index = MinMax(this.index, 0, 4);
	var currentAngle = this.index * 25;
	var tween = game.add.tween(this);
	tween.to({angle: -currentAngle}, 0.2*1000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	this.name.text = this.beasts[this.index].name;
	this.currentThought = this.beasts[this.index].GetThought();
	this.beasts[this.index].Selected();
}

BeastMenu.prototype.LeftArrow2 = function()
{
	var game = Brain.game;
	this.beasts[this.index].index--;
	this.currentThought = this.beasts[this.index].GetThought();
	var doc = document.getElementById("hiddenInput");
	doc.value = this.currentThought
}

BeastMenu.prototype.RightArrow2 = function()
{
	var game = Brain.game;
	this.beasts[this.index].index++;
	this.currentThought = this.beasts[this.index].GetThought();
	var doc = document.getElementById("hiddenInput");
	doc.value = this.currentThought
}

BeastMenu.prototype.Menu1 = function()
{
	var game = Brain.game;

}

BeastMenu.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS /1000;
	this.scrollBox.Update();
	this.manager.thought.Update(this.currentThought);
}

BeastMenu.prototype.Free = function()
{
	console.log("Memory Free");
}