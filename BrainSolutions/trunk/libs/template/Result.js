Brain.Result = function()
 {	
	this.isDebug = false;
	this.gameReady = false;
	this.starArray = [];
	this.starBackArray = [];
	this.scorePar = [500, 5000, 10000];
	this.exercise = null;
	this.message = "You are one step closer to tuning into your positive feelings.";
	this.ratingMessage = ["TRY AGAIN", "NOT BAD", "WELL DONE!", "EXCELLENT!"];
	this.timer = null;
	this.exitButton = null;
	this.brainGame = null
};

Brain.Result.prototype = 
{
	init: function(exercise, message, brainGame)
	{
		var game = Brain.game;
		this.brainGame = brainGame
		this.exercise = exercise;

		if(message != undefined)
			this.message = message
	},

	create: function() 
	{
		var game = Brain.game;
		game.input.enabled = true;
		this.s_gameOver = Brain.game.add.audio("s_gameOver");
		this.s_gameOver.play();

		var starRating = 0;
		this.isDebug = false;
		console.log("results created");
		game.stage.backgroundColor = Color.white;

		var group = game.add.group();
		this.timer = game.time.create(true);
	    var centerX = game.width / 2;
	    var topY = game.height * 0.2;
	    var middleY = game.height * 0.5;
	    var bottomY = game.height - (game.canvas.height / 10);
	    var spacing = 25;
	    var dummy = new Star();
	    var starPos = centerX - dummy.width - 25;
	    for(i = 0; i < 3 ; i++)
	    {
		    this.starBackArray[i] = Brain.AddSprite("star-back", 0, topY, 90* 1.3, 90* 1.3, 0.5, 0.5, false);
		    this.starArray[i] = new Star();

    		var star = this.starArray[i].Create(0, topY); 
    		var offset = star.sprite.width + 25;
    		star.sprite.x = starPos + offset * i;
    		this.starBackArray[i].x = starPos + offset * i;
    		star.sprite.width = 0;
	    }
	    this.starArray[1].sprite.y -= 10;
	    this.starBackArray[1].y -= 10;
	    this.starBackArray[1].frame = 1;
	    this.starBackArray[2].frame = 2;
	    // Determine how well a player performed
	    var currentScore = this.exercise.score;
	    Brain.LastGameScore = currentScore;
	    if(currentScore > Brain.highscore)
	    {	    	
	    	Brain.highscore = currentScore;
	    	Brain.TopScore = Brain.highscore;
	    }

	    if(this.exercise.level > Brain.skillLevel)
    		Brain.skillLevel = this.exercise.level;

		Brain.LastLevelReached = this.exercise.level;
		for(i = 0; i < 3 ; i++)
		{
			if(currentScore >= this.scorePar[i])
			{
				console.log(currentScore);
				var star = this.starArray[i];
				this.timer.add(i * 0.6 * 1000, star.Animate, star);
				starRating++;
			}
		}

		Brain.TopStar = NumberToWord(starRating);

		var rating = this.ratingMessage[starRating];
	    var titleSprite = Brain.AddText(rating, centerX, this.starArray[0].sprite.bottom + 50, Color.purple, 64, 0.5, 0.5, "bold", 1000);
	    var messageSprite = Brain.AddText(this.message, centerX, titleSprite.bottom + spacing, Color.gray, 24, 0.5, 0, "normal", 400);
	    messageSprite.align = "center";
	    var scoreBoxSprite = Brain.AddSprite("end-score", game.width / 2, middleY + 135, 250, 225, 0.5, 0.5);

	    var spacing = 30
	    var score = Brain.AddText("SCORE", scoreBoxSprite.left + spacing, scoreBoxSprite.top + 45 , Color.lightPurple, 26, 0, 0.5, "", 1000, "LatoRegular");
	    score.align = "left"
	    var scoreV = Brain.AddText(currentScore, scoreBoxSprite.right - spacing, scoreBoxSprite.top + 45 , Color.lightPurple, 28, 1, 0.5, "bold", 1000, "LatoRegular");
	    scoreV.align = "right"
	    var bestScore = Brain.AddText("BEST SCORE", scoreBoxSprite.left + spacing, score.bottom + 20, Color.gray, 19, 0, 0.5, "", 1000, "LatoRegular");
	    bestScore.align = "left"
	    var bestScoreV = Brain.AddText(Brain.highscore, scoreBoxSprite.right - spacing, score.bottom + 20, Color.gray, 19, 1, 0.5, "bold", 1000, "LatoRegular");
	    bestScoreV.align = "right"
	   
	    var skillLevel = Brain.AddText("SKILL LEVEL", scoreBoxSprite.left + spacing, scoreBoxSprite.top + 145, Color.lightPurple, 26, 0, 0.5, "", 1000, "LatoRegular");
	    skillLevel.align = "left"
	    var skillLevelV = Brain.AddText(this.exercise.level, scoreBoxSprite.right - spacing, scoreBoxSprite.top + 145, Color.lightPurple, 28, 1, 0.5, "bold", 1000, "LatoRegular");
	    skillLevelV.align = "right"
	    var bestSkill = Brain.AddText("BEST SKILL LEVEL", scoreBoxSprite.left + spacing, skillLevel.bottom + 20, Color.gray, 19, 0, 0.5,"", 1000, "LatoRegular");
	    bestSkill.align = "left"
	    var bestSkillV = Brain.AddText(Brain.skillLevel, scoreBoxSprite.right - spacing, skillLevel.bottom + 20, Color.gray, 19, 1, 0.5, "bold", 1000, "LatoRegular");
    	bestSkillV.align = "right"

	    var startGame = function()
	    {
	        game.state.start("Title", true, false, this.brainGame);
	    }
	    var replay = new GenericButton( "REPLAY", 0, 0, startGame, this, 200, 75);
	    replay.centerX = Brain.centerX;
	    replay.centerY = game.height * 0.9;
	    group.add(scoreBoxSprite);
	    group.add(score);
	    group.add(scoreV);
	    group.add(bestScore);
	    group.add(bestScoreV);
	    group.add(skillLevel);
	    group.add(skillLevelV);
	    group.add(bestSkill);
	    group.add(bestSkillV);

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

		this.timer.start();
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
		if (this.isDebug) 
		{
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

	exitPress: function () 
	{
		var game = Brain.game;
		console.log("ending");
		var time = Math.round(game.time.now / 1000);
		Brain.Minutes = FormatTime(time);
		console.log(Brain.Minutes);
		this.exit();
	},

	unpause: function (event) {
	    if (event.game.paused == true) {
	        event.game.paused = false;
	    }
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

	getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	},


};