'use strict';
(function () {
    var COAT_COLORS_ARRAY = [
        "rgb(101, 137, 164)",
        "rgb(241, 43, 107)",
        "rgb(146, 100, 161)",
        "rgb(56, 159, 117)",
        "rgb(215, 210, 55)",
        "rgb(0, 0, 0)",
    ];
    var EYES_COLORS_ARRAY = [
        "black",
        "red",
        "blue",
        "yellow",
        "green"
    ];
    var FIREBALL_COLORS_ARRAY = [
        "#ee4830",
        "#30a8ee",
        "#5ce6c0",
        "#e848d5",
        "#e6e848"
    ];

    var getRandomColor = function (element) {
        var choosenColor = "";
        if (element === "coat") {
            choosenColor = COAT_COLORS_ARRAY[Math.floor(COAT_COLORS_ARRAY.length * Math.random())];
        }
        else if (element === "eyes") {
            choosenColor = EYES_COLORS_ARRAY[Math.floor(EYES_COLORS_ARRAY.length * Math.random())];
        }
        else if (element === "fireball") {
            choosenColor = FIREBALL_COLORS_ARRAY[Math.floor(FIREBALL_COLORS_ARRAY.length * Math.random())];
        }
        return choosenColor;
        // return [choosenColor, element];
    };

    window.colorize = function (element, objectName) {
        var color = getRandomColor(objectName);

        if (element.tagName.toLowerCase() === "div") {
            element.style.backgroundColor = color;
            element.querySelector("input[name='fireball-color']").value = color;
        }
        else {
            element.style.fill = color;
        }
    };
})();