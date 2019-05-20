var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 140;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var COLUMN_GAP = 50;
var TEXT_WIDTH = 64;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - (FONT_GAP * 6) - (GAP * 3);

var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

var getMaxElement = function (array) {
    var maxElement = array[0] || 0;

    for (var i = 0; i < array.length; i++) {
        if(array[i] > maxElement) {
            maxElement = array[i];
        }
    }

    return maxElement;
};

var renderText = function (ctx, fontSize, text, x, y) {
    ctx.textBaseline = "hanging";
    ctx.font = fontSize || 16 + 'px PT Mono';
    ctx.fillStyle = "#000000";

    ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
    renderCloud(ctx, CLOUD_X, CLOUD_Y, "#ffffff");


    /*-----------------------------------------------------------------------------------------*/
    renderText(ctx, 16, "Ура вы победили!", CLOUD_X + GAP, CLOUD_Y + FONT_GAP);
    renderText(ctx, 16, "Список результатов:", CLOUD_X + GAP, CLOUD_Y + (FONT_GAP * 2));


    /*-----------------------------------------------------------------------------------------*/
    getArraysOfTheSameLength (players, times);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
        renderText(ctx, 16, players[i], CLOUD_X + GAP + (TEXT_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - FONT_GAP);

        renderText(ctx, 16, Math.round(times[i]), CLOUD_X + GAP + (TEXT_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - (FONT_GAP * 3) - GAP + ((-barHeight * times[i]) / maxTime));

        if (players[i] === "Вы") {
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
        }
        else {
                ctx.fillStyle = "rgba(0, 0, 255, " + (Math.random() * (1 - 0.2) + 0.2).toFixed(2) +")";
        }

        ctx.fillRect(CLOUD_X + GAP + (TEXT_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - (FONT_GAP) * 2, BAR_WIDTH, (-barHeight * times[i]) / maxTime);
    }







    /*-----------------------------------------------------------------------------------------*/
    // ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
    // ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + GAP + (FONT_GAP * 3), 400, 175);
    // ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + (GAP * 2) + (FONT_GAP * 4), 400, 150);

    /*-----------------------------------------------------------------------------------------*/
    // ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    // ctx.fillRect(CLOUD_X + GAP, CLOUD_Y + GAP + (FONT_GAP * 3), TEXT_WIDTH, 175);
    //
    // ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    // ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH + COLUMN_GAP, CLOUD_Y + GAP + (FONT_GAP * 3), TEXT_WIDTH, 175);
    //
    // ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    // ctx.fillRect(CLOUD_X + GAP + (TEXT_WIDTH + COLUMN_GAP) * 2, CLOUD_Y + GAP + (FONT_GAP * 3), TEXT_WIDTH, 175);
    //
    // ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    // ctx.fillRect(CLOUD_X + GAP + (TEXT_WIDTH + COLUMN_GAP) * 3, CLOUD_Y + GAP + (FONT_GAP * 3), TEXT_WIDTH, 175);


};