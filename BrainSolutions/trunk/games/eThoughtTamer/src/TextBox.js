TextBox = function (exercise, manager)
{
	var game = Brain.game;
	Phaser.Group.call(this, game);
	var graphics = new Phaser.Graphics(game, 0, 0);
	graphics.beginFill(Color.lightGrayHex);
	graphics.lineStyle(1, Color.blackHex, 1);
	graphics.drawRoundedRect(0, 0, 400, 200, 1);
	var back = graphics.generateTexture();
	this.background = new Phaser.Sprite(game, 0, 0, back);
	var inputLine = new Phaser.Graphics(game, 0, 0);
	inputLine.lineStyle(2, Color.blackHex, 1);
	inputLine.lineTo(0, 20)
	var line = inputLine.generateTexture();
	this.inputLine = new Phaser.Sprite(game, game.width * 0.5, game.height * 0.5, line);
	this.exercise = exercise;
	this.manager = manager;
	this.word = "";
	this.info = new Phaser.Text(game, 0, this.background.top - 50, "Describe your thought", {fill: Color.black, fontSize: 21});
	this.info.anchor.set(0.5, 0.5)
	this.info.align = "center"
	this.info.centerX = this.background.centerX
	this.input = Brain.AddText("(Type here to describe your thought)", 5, this.background.top + 15, Color.black, 21, 0, 0, "normal", 400, "LatoRegular");
	this.input.setTextBounds(5, 0, 400, 500)
	this.input.wordWrap = true;
	this.input.boundsAlignH = "left";

	this.background.inputEnabled = true;
    this.add(this.background);
    this.add(this.info);
    this.add(this.input);
    //this.add(this.inputLine)
    this.newLine = 0;
    this.lines = 0
    game.input.keyboard.addCallbacks(this, null, this.KeyPress, null );
    var doc = document.getElementById("hiddenInput");
	this.background.events.onInputDown.add(this.DisplayKeyboard, this);

	game.add.existing(this);
	return this;
};

TextBox.prototype = Object.create(Phaser.Group.prototype);
TextBox.prototype.constructor = TextBox;

TextBox.prototype.Init = function(title, step, context, info, blank, preset)
{		
	var game = Brain.game;
	var doc = document.getElementById("hiddenInput");
	var call = function()
	{
		if(IsEmpty(doc.value) )
		{
			this.input.text= blank;
		}
		else
		{
			var signal = new Phaser.Signal();
			signal.add(step, context);
			signal.dispatch();
		}
	}
	this.manager.beastMenu.SetCallback(call, this, "Continue", 200);
	this.info.text = title;
	this.input.text = info;
	this.Display(false);
}

TextBox.prototype.Call = function()
{
	this.visible = visible;
	if(this.visible == false)
	{
		document.getElementById("hiddenInput").blur();
	}
}

TextBox.prototype.Display = function(visible)
{
	this.visible = visible;
	var game = Brain.game
	if(this.visible == false)
	{
		document.getElementById("hiddenInput").blur();
	}
}

TextBox.prototype.DisplayKeyboard = function()
{
	console.log("keyboard Go!");
	var game = Brain.game
	scroll(0, 0)
	document.getElementById("hiddenInput").focus();
	var doc = document.getElementById("hiddenInput");
	console.log(doc.value);
	doc.value = ""
	this.manager.beastMenu.next.visible = true;

}

TextBox.prototype.KeyPress = function(event) 
{
    //  Clear the BMD
    //this.bmd.cls();
    var game = Brain.game;
    //var c = char.key;
    //if(char.shiftKey ==true)
   // {
    	//c.toUpperCase();
    //}

    //if(char.key == "Backspace")
    //{
    	//this.word = this.word.slice(0, this.word.length - 1);
    //}
    //else 
    //{
		//this.word += char;
    //}
    var doc = document.getElementById("hiddenInput");
    this.input.text = doc.value;
    // this.inputLine.x = this.input.width + 15 - this.newLine
    // this.inputLine.y = this.input.height - 15
    // if(this.input.text.length > 30 * this.lines)
    // {
    // 	this.newLine = this.input.width
    // 	this.lines++
    // }
    console.log("keyPRessed")
}

TextBox.prototype.Update = function()
{
	var game = Brain.game;
	var dt = game.time.elapsedMS /1000;

}

TextBox.prototype.Free = function()
{
	console.log("Memory Free");
}