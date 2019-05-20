var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 200;
var CLOUD_X = 100;
var CLOUD_Y = 50;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 20;
var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;


var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
    var maxElement = 0;

    if (array && array.length >= 1) {
        maxElement = array[0];

        for (var i = 1; i < array.length; i++) {
            if (array[i] > maxElement) {
                maxElement = array[i];
            }
        }
    }

    return maxElement;
};

var getArraysOfTheSameLength = function (names, times) {
    for (var j = 0; j < names.length; j++) {
        if (names.length > 4) {
            names.pop();
            console.log(names);
        }
    }

    for (var k = 0; k < times.length; k++) {
        if (times.length > 4) {
            times.pop();
            console.log(times);
        }
    }
};

var renderText = function (ctx, message, x, y) {
    ctx.textBaseline = "hanging";
    ctx.font = '16px PT Mono';
    ctx.fillStyle = "#000000";
    ctx.fillText(message, x, y);
};

window.renderStatistics = function (ctx, names, times) {

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.beginPath();
    ctx.moveTo(120, 20);
    ctx.lineTo(480, 40);
    ctx.lineTo(510, 80);
    ctx.lineTo(510, 260);
    ctx.lineTo(130, 280);
    ctx.lineTo(110, 260);
    ctx.lineTo(130, 70);
    ctx.lineTo(120, 20);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(110, 10);
    ctx.lineTo(470, 30);
    ctx.lineTo(500, 70);
    ctx.lineTo(500, 250);
    ctx.lineTo(120, 270);
    ctx.lineTo(100, 250);
    ctx.lineTo(120, 60);
    ctx.lineTo(110, 10);
    ctx.closePath();
    ctx.fill();


    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
    renderCloud(ctx, CLOUD_X, CLOUD_Y, "#ffffff");

    renderText(ctx, "Ура вы победили!", CLOUD_X + FONT_GAP, 30);
    renderText(ctx, "Список результатов:", CLOUD_X + FONT_GAP, 48);


    renderText(ctx, "Вы", 140, CLOUD_HEIGHT - FONT_GAP + GAP);
    ctx.fillStyle = "rgba(200, 20, 20, 1)";
    ctx.fillRect(140, CLOUD_Y + GAP, BAR_WIDTH, barHeight);

    renderText(ctx, "Иван", 240, 230);
    ctx.fillStyle = "rgba(20, 20, 200, 1)";
    ctx.fillRect(240, 20, 30, 130);

    renderText(ctx, "Юлия", 340, 230);
    ctx.fillStyle = "rgba(20, 20, 150, 1)";
    ctx.fillRect(340, 20, 30, 130);

    renderText(ctx, "Кекс", 440, 230);
    ctx.fillStyle = "rgba(20, 20, 100, 1)";
    ctx.fillRect(440, 20, 30, 130);


    ctx.fillStyle = "#000000";

    getArraysOfTheSameLength(names, times);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {

        //     //   MAX_BAR         BAR[I]
        //     // -----------  =  ----------
        //     //  BAR_WIDTH          X
        //
        //     //  X = (BAR_WIDTH * BAR[I]) / MAX_BAR

        ctx.fillText(names[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_WIDTH) * i);
        ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_WIDTH) * i, BAR_WIDTH, (barHeight * times[i]) / maxTime);
    }
};