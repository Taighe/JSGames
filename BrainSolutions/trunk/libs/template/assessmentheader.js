function AssessmentHeader(gameScreen) {
	var game = Brain.game;
	this.gameScreen = gameScreen;
	this.currentPlot = -1;
	this.purplePlots = [];
	this.purpleBars = [];
}

AssessmentHeader.prototype.constructor = AssessmentHeader;

var method = AssessmentHeader.prototype;

method.Init = function () {}

// Takes in a context because phaser.
method.NextPlot = function (context) {

	if (context.currentPlot >= 0)
		context.purpleBars[context.currentPlot].visible = true;

	context.currentPlot++;
	context.purplePlots[context.currentPlot].visible = true;
}

method.Create = function (NumberOfPlots) {
	var game = Brain.game;
	this.group = game.add.group();

	var xOffset = 50;
	var xSpaceBetween = 150;
	var PlotWidth = 40;
	var PlotHeight = 40;
	var yOffset = 50;

	for (var i = 0; i < NumberOfPlots; ++i) {

		var Spacing = PlotWidth;

		if (i > 0)
			Spacing += xSpaceBetween;


		var xPos = xOffset + (Spacing * i);


		if (i != NumberOfPlots - 1) {
			var barXPos = xPos + PlotWidth;

			var barsprite = Brain.game.add.sprite(barXPos, yOffset, "greyline");
			barsprite.anchor.set(0.3, 0.5);
			barsprite.width = 200;
			barsprite.height = 14;
			this.group.add(barsprite);

			var barpurpsprite = Brain.game.add.sprite(barXPos, yOffset, "purpleline");
			barpurpsprite.anchor.set(0.3, 0.5);
			barpurpsprite.width = 200;
			barpurpsprite.height = 14;
			this.group.add(barpurpsprite);
			barpurpsprite.visible = false;
			this.purpleBars.push(barpurpsprite);
		}



		var greyplot = Brain.game.add.sprite(xPos, yOffset, "greyplot");
		greyplot.anchor.set(0.5, 0.5);
		greyplot.width = PlotWidth;
		greyplot.height = PlotHeight;
		this.group.add(greyplot);


		var purpleplot = Brain.game.add.sprite(xPos, yOffset, "purpleplot");
		purpleplot.anchor.set(0.5, 0.5);
		purpleplot.width = PlotWidth;
		purpleplot.height = PlotHeight;
		this.group.add(purpleplot);
		this.purplePlots.push(purpleplot);
		purpleplot.visible = false;

		var style = {
			font: "normal 22px Arial",
			fill: Color.white,
			boundsAlignH: "center",
			boundsAlignV: "middle",
			align: "center"
		};

		this.questionText = Brain.AddTextWithStyle(i + 1, {
			x: xPos,
			y: yOffset
		}, {
			x: 0.5,
			y: 0.5
		}, style);
		
		this.group.add(this.questionText)
		this.gameScreen.add(this.group)
		this.group.centerX = game.width * 0.5
	}

	/*
		var style = {
			font: "normal 22px LatoRegular",
			fill: Color.gray,
			boundsAlignH: "center",
			boundsAlignV: "middle",
			wordWrap: true,
			wordWrapWidth: game.width / 2,
			align: "center"
		};

		this.questionText = Brain.AddTextWithStyle(QuestionText, Position, {
			x: 0.5,
			y: 0.5
		}, style);
		console.log("making question");

		for (var i = 0; i < AnswersArray.length; ++i) {

			var newAnswer = new Answer(this.gameScreen);
			newAnswer.Create({
				x: game.width / 2,
				y: 250 + (100 * i)
			}, AnswersArray[i].AnswerText, AnswersArray[i].Correct, OnClick);

			this.AnswerObjArray.push(newAnswer);
			//this.gameScreen.add(newAnswer);
		}

		this.gameScreen.add(this.questionText);*/
}

method.Show = function () {

}