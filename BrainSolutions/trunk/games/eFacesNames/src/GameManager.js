GameManager = function (exercise)
{
	var game = Brain.game;
	this.spacing = 35;
	this.scoreBonus = 1000;
	this.exercise = exercise;
	this.group = game.add.group();
	this.info = Brain.AddText("", 0, 0, Color.black, 34, 0.5, 0.5, "normal", 600, "LatoRegular");
	this.info.centerY = 0;
	this.info.align = "center"
	this.box = game.add.sprite(0, 0, "greyBox");
	this.box.scale.set(0.8);
	this.box.anchor.set(0.5, 0.5);
	this.box.top = this.info.bottom + this.spacing;
	this.question = Brain.AddText("", 0, 0, Color.lightPurple, 30, 0.5, 0.5, "normal", 800, "LatoRegular");
	this.question.top = this.box.bottom + this.spacing;
	this.options = [];
	this.button = new GenericButton("CONTINUE", 0 , 0, this.NextQuestion, this, 200, 75);
	this.button.centerX = Brain.centerX;
	this.button.centerY = game.height * 0.95;
	this.answer = null;
	this.faceSprite = game.add.sprite( 0, 0, "male");
	this.faceSprite.scale.set(0.8);
	this.faceSprite.anchor.set(0.5, 0.47);
	this.faceSprite.centerX = 0;
	this.faceSprite.y = this.box.y;
	this.fFaces = [0,1,2,4,5,6,7,8,9,10]
	this.mFaces = [0,2,3,4,5,6,7,8,9,10]
	this.fNames = ["JESSICA", "JENNIFER", "OLIVIA", "MARIA", "ALICIA", "LOUISE", "MARY", "GRACE", "ELISSA", "ELIZABETH", "BARBARA", "BETH", "KIM", "MAE", "MELVA", "RACHAEL", "REYNA", "TALIA"];
	this.mNames = ["DAVID", "JOHN", "PAUL", "RICHARD", "CHRIS", "MARK", "DANIEL", "OLIVER", "JACK", "IAN", "ABEL", "ADRIAN", "AUSTIN", "BARNEY", "BRAD", "BUCK", "CARL", "CLINT", "COY", "DALE", "LUKE", "MARVIN", "RALPH","LANCE", "TAIGHE"];
	this.lastNames = ["HUDSON", "SAUNDERS", "JACKSON", "CLARK", "SMITH", "JONES", "MILLER", "ANDERSON", "LOWE", "BROWN", "WILLIAMS", "ADAMS", "YOUNG", "SHERMAN", "PAGE", "PEPPER", "CHASE", "COOPER", "WESTER"];
	this.occupation = ["Doctor", "CEO", "Personal Trainer", "Teacher", "Biochemist", "Art Director", "Fundraiser", "Research Officer", "Vice President", "Banker", "Executive", "Model", "Hotel Concierge", "Designer", "Games Programmer", "Executive Assistant", "Journalist", "Builder", "Actor", "Care Worker", "Fire Fighter", "Florist", "Pathologist", "Pharmacist", "Photographer","Lawyer"];
	this.profiles = [];
	this.fProfiles = [];
	this.mProfiles = [];
	this.revealOrder = [];
	this.person = null;
	this.count = 2;
	this.size = 20;
	this.round = 0;
	this.scoreTime  = 0;
	this.group.add(this.info);
	this.group.add(this.box);
	this.group.add(this.faceSprite);
	this.group.add(this.question);
	this.group.centerX = Brain.centerX;
	this.group.centerY = game.height * 0.41;
	this.optionsGroup = game.add.group();
	this.ready = false;
	this.group.add(this.optionsGroup);
	console.log(this.faceSprite)
	this.mask = new Phaser.Graphics(game, 0, 0);
	this.mask.beginFill(Color.blackHex);
	this.mask.drawRoundedRect(0, 0, 290, 290);
	game.add.existing(this.mask)
	// Generate Profiles

	// Female Profiles
	var fNames = CopyCollection(this.fNames);
	var lastNames = CopyCollection(this.lastNames);
	var fFaces = CopyCollection(this.fFaces);
	var halfSize = parseInt(this.size * 0.5);
	for(i=0; i < halfSize; i++) 
	{
		var profile = new Profile;
		var randName = GetRandomInt(0, fNames.length - 1);
		var randLast = GetRandomInt(0, this.lastNames.length - 1);
		var randFace = GetRandomInt(0, fFaces.length - 1);
		var randOccupation = GetRandomInt(0, this.occupation.length - 1);
		profile.data.name = fNames[randName] + " " + this.lastNames[randLast];
		profile.data.face = fFaces[randFace];
		profile.data.sex = "f";
		profile.data.occupation = this.occupation[randOccupation];
		this.profiles.push(profile);
		this.fProfiles.push(profile)
		fNames.splice(randName, 1);
		fFaces.splice(randFace, 1);
	}
	// Male Profiles
	var mNames = CopyCollection(this.mNames);
	var lastNames = CopyCollection(this.lastNames);
	var mFaces = CopyCollection(this.mFaces);
	for(i=0; i < halfSize; i++) 
	{
		var profile = new Profile;
		var randName = GetRandomInt(0, mNames.length - 1);
		var randLast = GetRandomInt(0, this.lastNames.length - 1);
		var randFace = GetRandomInt(0, mFaces.length - 1);
		var randOccupation = GetRandomInt(0, this.occupation.length - 1);
		profile.data.name = mNames[randName] + " " + this.lastNames[randLast];
		profile.data.face = mFaces[randFace];
		profile.data.sex = "m";
		profile.data.occupation = this.occupation[randOccupation];
		this.profiles.push(profile);
		this.mProfiles.push(profile)
		mNames.splice(randName, 1);
		mFaces.splice(randFace, 1);
	}

	this.profilePool = [];

	this.roundT = Brain.AddText("ROUND", 0, 0, Color.lightGray, 20, 0.5, 0.5, "normal", 600, "LatoRegular");
	this.roundT.centerX = game.width * 0.5
	this.roundT.centerY = game.height * 0.04

	this.roundV = Brain.AddText("1/10", 0, 0, Color.lightPurple, 48, 0.5, 0.5, "bold", 600, "LatoRegular");
	this.roundV.centerX = game.width * 0.5
	this.roundV.top = this.roundT.bottom - 5
};

GameManager.prototype.NextQuestion = function()
{
	var game = Brain.game;
	this.button.visible  =false;
	this.round++;
	if(this.exercise.correct == true && this.round == 1  )
	{
		this.Question2(this.person);
	}
	else if(this.exercise.correct  == false || this.round >= 2)
	{
		this.exercise.LevelEnd();
	}
}

GameManager.prototype.Init = function()
{		
	var game = Brain.game;
	HudManager.timerSprite.visible = false;
	HudManager.timeSprite.visible = false;
	this.faceSprite.alpha = 0;
	this.scoreBonus = 1000;
	this.round = 0;
	this.exercise.duration = 10;
	this.exercise.timer.destroy();
	this.exercise.timer = game.time.create(true);
	this.exercise.timer.add(this.exercise.duration * 1000, this.TimeUp, this);
	this.exercise.timer.start();
	this.exercise.timer.pause();
	this.button.visible = false;
	this.profiles = Shuffle(this.profiles, game);
	this.profilePool = [];
	this.revealOrder = [];
	this.options = [];
	this.optionsGroup.removeAll(true);
	this.count = 1 + this.exercise.level;
	var profiles = CopyCollection(this.profiles);
	for(i = 0; i < this.count; i++)
	{
		var rand = GetRandomInt(0, profiles.length - 1);
		var profile = profiles[rand];
		this.profilePool.push(profile);
		profiles.splice(rand, 1);
	}
	this.question.top = this.box.bottom + this.spacing;
	this.roundV.text = this.exercise.level + "/10"
	this.mask.visible = false
}

GameManager.prototype.Intro = function()
{
	var game = Brain.game;
	this.info.text = "Make a mental note of each person's name and occupation.";
	var timer = game.time.create(true);
	this.box.alpha = 0;
	this.box.scale.set(0);
	var fade = Brain.TweenFade(this.box, 1, true, 0.5, 0);
	var tween = game.add.tween(this.box.scale);
	tween.to({x: 0.8, y: 0.8}, 0.5* 1000, Phaser.Easing.Quadratic.InOut, true, 0,0 , false);
	var index = 0;

	for(i =0; i < this.count; i++)
	{
		timer.add(i * 5 * 1000, this.DisplayProfile, this, this.profilePool[i]);
		index++;
	}

	this.person = this.profilePool[GetRandomInt(0, this.profilePool.length - 1)];
	timer.add(index * 5 * 1000, this.Question1, this);
	timer.start();
	this.info.centerY = 0;
	this.box.centerX = 0;
	this.mask.clear()
	this.mask.beginFill(Color.blackHex);
	this.mask.drawRoundedRect(0, 0, 290, 290);
	this.mask.centerX = game.width * 0.5 
	this.mask.centerY = game.height * 0.5 
	this.box.y = this.mask.y - 20;
	this.faceSprite.y = game.height * 0.3;
	this.question.y = game.height * 0.65
	this.faceSprite.mask = this.mask
	this.mask.visible = true
}

GameManager.prototype.DisplayProfile = function(profile)
{
	var game = Brain.game;
	console.log(profile)
	this.question.text = "Name: " + profile.data.name + "\n" + "Occupation: " + profile.data.occupation;
	this.question.alpha = 0;
	var fade = Brain.TweenFade(this.question, 1, true, 0.5, 0);
	this.faceSprite.loadTexture("male");
	if(profile.data.sex == "f")
	{
		this.faceSprite.loadTexture("female");
	}
	this.faceSprite.visble = true;
	this.faceSprite.alpha = 0;
	this.faceSprite.frame = profile.data.face;
	var fade = Brain.TweenFade(this.faceSprite, 1, true, 0.5, 0);
}

GameManager.prototype.TimeUp = function()
{
	var game = Brain.game;
	this.info.text= "TIME'S UP";
	this.CheckAnswer(false);
}	

GameManager.prototype.Question1 = function()
{
	var game = Brain.game;
	this.box.top = game.height * 0.05
	this.faceSprite.y = this.box.y;
	this.question.top = this.box.bottom + this.spacing;
	this.mask.centerX = game.width * 0.5 
	this.mask.y = this.box.y + 21

	this.faceSprite.loadTexture("male");
	if(this.person.data.sex == "f")
	{
		this.faceSprite.loadTexture("female");
	}
	this.faceSprite.frame = this.person.data.face;
	var fadeInfo = Brain.TweenFade(this.info, 0, true, 0.5, 0);
	this.question.alpha = 0;
	this.question.text = "What is this person's name?";
	this.question.top = this.box.bottom + 10;
	var fade = Brain.TweenFade(this.question, 1, true, 0.5, 0);	
	this.DisplayOptions( true);
}

GameManager.prototype.Question2 = function()
{
	var fadeInfo = Brain.TweenFade(this.info, 0, true, 0.5, 0);
	this.question.alpha = 0;
	this.question.text = "What is this person's occupation?";
	this.question.top = this.box.bottom + 10;
	var fade = Brain.TweenFade(this.question, 1, true, 0.5, 0);
	this.DisplayOptions( false);
}

GameManager.prototype.DisplayOptions = function( name)
{
	var game = Brain.game;
	HudManager.timerSprite.visible = true;
	HudManager.timeSprite.visible = true;
	HudManager.ripple.visible = true;

	this.revealOrder = [];
	this.ready = true;	
	this.exercise.duration = 12;
	this.exercise.timer.destroy();
	this.exercise.timer = game.time.create(true);
	this.exercise.timer.add(this.exercise.duration * 1000, this.TimeUp, this);
	this.exercise.timer.start();
	this.answer = this.person.data.occupation;
	var startY = this.question.bottom + this.spacing ;
	
	if(name == true)
		this.answer = this.person.data.name;

	this.options = [];
	this.optionsGroup.removeAll(true);
	var profiles = CopyCollection(this.profiles);
	var fProfiles = CopyCollection(this.fProfiles);
	var mProfiles = CopyCollection(this.mProfiles);
	var occupations = CopyCollection(this.occupation);
	var anI = profiles.indexOf(this.person); 
	console.log(anI)
	var oI = occupations.indexOf(this.person.data.occupation); 
	console.log(oI)
	occupations.splice(oI, 1)
	this.options.push(profiles[anI]);
	profiles.splice(anI, 1)
	fProfiles.splice(anI, 1)
	var mI = mProfiles.indexOf(this.person); 
	var fI = fProfiles.indexOf(this.person); 
	mProfiles.splice(mI, 1)
	fProfiles.splice(fI, 1)
	console.log(mProfiles)
	var _profiles = fProfiles
	if(this.person.data.sex == "m")
	{
		_profiles = mProfiles
	}

	for(i=1; i < 4; i++)
	{

		var rand = GetRandomInt(0, _profiles.length - 1);
		var randOccupation = GetRandomInt(0, occupations.length - 1);
		var profile = _profiles[rand];
		
		profile.data.occupation = occupations[randOccupation];
		occupations.splice(randOccupation, 1)
		console.log(occupations)
		this.options.push(profile);
		_profiles.splice(rand, 1)
	}
	this.options = Shuffle(this.options);
	for(i=0; i < 4; i++)
	{
		var profile = this.options[i];
		var text = profile.data.occupation;

		if(name == true)
			text = profile.data.name;
		
		var option = new Option(this, text, this.box.centerX - 50, 0);
		if(option.answer.text != this.answer)
		{
			this.revealOrder.push(option );
		}

		option.centerY = startY + this.spacing * 1.5 * i;
		this.optionsGroup.add(option);
		this.optionsGroup.centerX = 0;
		profiles.splice(rand, 1)
	}
	this.revealOrder = Shuffle(this.revealOrder);
	this.revealOrder.push(null );
	this.exercise.timer.start();
}

GameManager.prototype.Update = function()
{
	var game = Brain.game;
	
	if(this.ready)
	{
        var currentTime = this.exercise.duration - this.exercise.timer.ms / 1000;
    	var percent = currentTime / this.exercise.duration;
		this.scoreBonus = 1000 * percent;
		var index = Math.abs(Math.round(3 * percent * 2));
		index = MinMax(index, 1, 3);
		if(this.revealOrder[index] != null)
		{
			this.revealOrder[index].Disabled();
		}
	}
	
}

GameManager.prototype.CheckAnswer = function(answer)
{
	var game = Brain.game;
	this.revealOrder = [];
	this.ready = false;
	var check = this.answer == answer;
	this.exercise.timer.pause();

	for(i=0; i < this.optionsGroup.children.length;i++)
	{
		this.optionsGroup.children[i].Disabled();
		if(this.optionsGroup.children[i].answer.text == this.answer)
		{
			this.optionsGroup.children[i].alpha = 1;
		}
	}

	if(check)
	{
		this.info.text= "CORRECT";
		this.exercise.correct = true;
		this.exercise.s_win.play()
		this.exercise.score += Math.round(this.scoreBonus);
	}
	else
	{		
		if(answer != false )
		{
			this.info.text= "WRONG";
			this.exercise.s_lose.play();
			this.exercise.correct = false;
		}
		else
		{
			this.info.text= "TIME'S UP";
			this.exercise.s_lose.play();
			this.exercise.correct = false;
		}
	}
	HudManager.timerSprite.visible = false;
	HudManager.timeSprite.visible = false;
	HudManager.ripple.visible = false;
	this.info.alpha = 1;
	this.button.visible = true;
}

GameManager.prototype.Outro = function()
{
	var game = Brain.game;

}

GameManager.prototype.Free = function()
{
	var game = Brain.game;
	this.roundT.destroy()
	this.roundV.destroy()
	this.mask.destroy()
}