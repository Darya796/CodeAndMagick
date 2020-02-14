'use strict';

(function () {
    /*  ГЕНЕРАЦИЯ И ОТРИСОВКА ПОХОЖИХ МАГОВ  */
    var userDialog = document.querySelector(".setup");
    var similarListElement = document.querySelector(".setup-similar-list");
    var similarWizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");

    var renderWizard = function (wizard) {
        var wizardElement = similarWizardTemplate.cloneNode(true);

        wizardElement.querySelector(".setup-similar-label").textContent = wizard.name;
        wizardElement.querySelector(".wizard-coat").style.fill = wizard.colorCoat;
        wizardElement.querySelector(".wizard-eyes").style.fill = wizard.colorEyes;

        return wizardElement;
    };

    var onLoad = function (wizards) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 4; i++) {
            fragment.appendChild(renderWizard(wizards[i]));
        }
        similarListElement.appendChild(fragment);
        userDialog.querySelector(".setup-similar").classList.remove("hidden");
    };

    var onError = function (message) {
        var node = document.createElement("div");
        node.style = "z-index: 100; margin: 0 auto; text-align: center; background: red; font-size: 30px;";
        node.style.position = "absolute";
        node.style.left = 0;
        node.style.right = 0;
        node.textContent = message;
        document.body.insertAdjacentElement("afterbegin", node);
    };

    window.backend.load(onLoad, onError);







    /*--------------------------------------------------------------------------------*/
    /*  СМЕНА ЦВЕТА ВОЛШЕБНИКА ПО КЛИКУ  */

    var wizardCoatColor = document.querySelector(".setup-wizard .wizard-coat");
    var wizardEyesColor = document.querySelector(".setup-wizard .wizard-eyes");
    var wizardFireballColor = document.querySelector(".setup-fireball-wrap");
    // var coatHiddenInput = document.querySelector("input[name='coat-color']");
    // var eyesHiddenInput = document.querySelector("input[name='eyes-color']");
    // var fireballHiddenInput = document.querySelector("input[name='fireball-color']");


    wizardCoatColor.addEventListener("click", function () {
        window.colorize(wizardCoatColor, "coat");
    });
    wizardEyesColor.addEventListener("click", function () {
        window.colorize(wizardEyesColor, "eyes");
    });
    wizardFireballColor.addEventListener("click", function () {
        window.colorize(wizardFireballColor, "fireball");
    });

    // wizardCoatColor.addEventListener("click", function () {
    // let choosenCoatColor = COAT_COLORS_ARRAY[Math.floor(Math.random() * COAT_COLORS_ARRAY.length)];
    // this.style.fill = choosenCoatColor;
    // coatHiddenInput.value = choosenCoatColor;
    // });

    // wizardEyesColor.addEventListener("click", function () {
    //     let choosenEyesColor = EYES_COLORS_ARRAY[Math.floor(Math.random() * EYES_COLORS_ARRAY.length)];
    //     this.style.fill = choosenEyesColor;
    //     eyesHiddenInput.value = choosenEyesColor;
    // });
    //
    // wizardFireballColor.addEventListener("click", function () {
    //     let choosenFireballColor = FIREBALL_COLORS_ARRAY[Math.floor(Math.random() * FIREBALL_COLORS_ARRAY.length)];
    //     this.style.background = choosenFireballColor;
    //     fireballHiddenInput.value = choosenFireballColor;
    // });

})();