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


    /*  СМЕНА ЦВЕТА ВОЛШЕБНИКА ПО КЛИКУ  */

    var getRandomElement = function (array) {
        var randomElementIndex = Math.floor(array.length * Math.random());
        return array[randomElementIndex];
    };

    var wizardCoatColor = document.querySelector(".setup-wizard .wizard-coat");
    var wizardEyesColor = document.querySelector(".setup-wizard .wizard-eyes");
    var wizardFireballColor = document.querySelector(".setup-fireball-wrap");


    wizardCoatColor.addEventListener("click", function () {
        var newColor = getRandomElement(COAT_COLORS_ARRAY);
        this.style.fill = newColor;
        window.wizard.onCoatChange(newColor);
    });
    wizardEyesColor.addEventListener("click", function () {
        // window.colorize(wizardEyesColor, "eyes");
        var newColor = getRandomElement(EYES_COLORS_ARRAY);
        this.style.fill = newColor;
        window.wizard.onEyesChange(newColor);
    });
    wizardFireballColor.addEventListener("click", function () {
        window.colorize(wizardFireballColor, "fireball");
    });


})();