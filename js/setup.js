//  ФАЙЛ SETUP.JS
'use strict';

(function () {
    /*  ГЕНЕРАЦИЯ И ОТРИСОВКА ПОХОЖИХ МАГОВ  */

    var FIRST_NAMES_ARRAY = [
        "Иван",
        "Хуан Себастьян",
        "Мария",
        "Кристоф",
        "Виктор",
        "Юлия",
        "Люпита",
        "Вашингтон"
    ];
    var SECOND_NAMES_ARRAY = [
        "да Марья",
        "Верон",
        "Мирабелла",
        "Вальц",
        "Онопко",
        "Топольницкая",
        "Нионго",
        "Ирвинг"
    ];
    var userDialog = document.querySelector(".setup");
    var similarListElement = document.querySelector(".setup-similar-list");
    var similarWizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");
    var arrayOfWizards = [];


    var generateWizardData = function () {
        // var fullName = "";

        for (var i = 0; i < 4; i++) {
            var choosenFirstName = FIRST_NAMES_ARRAY[Math.floor(Math.random() * FIRST_NAMES_ARRAY.length)];
            var choosenLastName = SECOND_NAMES_ARRAY[Math.floor(Math.random() * SECOND_NAMES_ARRAY.length)];
            // fullName = choosenFirstName + " " + choosenLastName;

            // var choosenCoatColor = COAT_COLORS_ARRAY[Math.floor(Math.random() * COAT_COLORS_ARRAY.length)];
            // var choosenEyesColor = EYES_COLORS_ARRAY[Math.floor(Math.random() * EYES_COLORS_ARRAY.length)];

            arrayOfWizards.push({
                name: choosenFirstName + " " + choosenLastName,
                // name: fullName,
                // coatColor: choosenCoatColor,
                // eyesColor: choosenEyesColor
            })

        }

    };

    generateWizardData();

    var renderWizard = function (wizard) {
        var wizardElement = similarWizardTemplate.cloneNode(true);

        wizardElement.querySelector(".setup-similar-label").textContent = wizard.name;
        window.colorize(wizardElement.querySelector(".wizard-coat"), "coat", false);
        window.colorize(wizardElement.querySelector(".wizard-eyes"), "eyes", false);
        // wizardElement.querySelector(".wizard-coat").style.fill = wizard.coatColor;
        // wizardElement.querySelector(".wizard-eyes").style.fill = wizard.eyesColor;

        return wizardElement;
    };

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrayOfWizards.length; i++) {
        fragment.appendChild(renderWizard(arrayOfWizards[i]));
    }

    similarListElement.appendChild(fragment);
    userDialog.querySelector(".setup-similar").classList.remove("hidden");


    /*--------------------------------------------------------------------------------*/
    /*  СМЕНА ЦВЕТА ВОЛШЕБНИКА ПО КЛИКУ  */

    var wizardCoatColor = document.querySelector(".setup-wizard .wizard-coat");
    var wizardEyesColor = document.querySelector(".setup-wizard .wizard-eyes");
    var wizardFireballColor = document.querySelector(".setup-fireball-wrap");
    // var coatHiddenInput = document.querySelector("input[name='coat-color']");
    // var eyesHiddenInput = document.querySelector("input[name='eyes-color']");
    // var fireballHiddenInput = document.querySelector("input[name='fireball-color']");


    window.colorize(wizardCoatColor, "coat", true);
    window.colorize(wizardEyesColor, "eyes", true);
    window.colorize(wizardFireballColor, "fireball", true);

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