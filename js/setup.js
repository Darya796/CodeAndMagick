'use strict';

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
var userDialog = document.querySelector(".setup");
var setupOpen = document.querySelector(".setup-open");
var setupClose = document.querySelector(".setup-close");
var similarListElement = document.querySelector(".setup-similar-list");
var similarWizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");
var arrayOfWizards = [];


var generateWizardData = function () {
    var fullName = "";

    for (var i = 0; i < 4; i++) {
        var choosenFirstName = FIRST_NAMES_ARRAY[Math.floor(Math.random() * FIRST_NAMES_ARRAY.length)];
        var choosenLastName = SECOND_NAMES_ARRAY[Math.floor(Math.random() * SECOND_NAMES_ARRAY.length)];
        fullName = choosenFirstName + " " + choosenLastName;

        var choosenCoatColor = COAT_COLORS_ARRAY[Math.floor(Math.random() * COAT_COLORS_ARRAY.length)];
        var choosenEyesColor = EYES_COLORS_ARRAY[Math.floor(Math.random() * EYES_COLORS_ARRAY.length)];

        arrayOfWizards.push({
            name: fullName,
            coatColor: choosenCoatColor,
            eyesColor: choosenEyesColor
        })

    }

};

generateWizardData();

var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(".setup-similar-label").textContent = wizard.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizard.coatColor;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizard.eyesColor;

    return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < arrayOfWizards.length; i++) {
    fragment.appendChild(renderWizard(arrayOfWizards[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector(".setup-similar").classList.remove("hidden");


/*------------------------------------------------------------------------------------------------------------------*/
var userNameInput = document.querySelector(".setup-user-name");
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
    // console.log(evt.target);
    if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
        closePopup();
    }
};

var openPopup = function () {
    userDialog.classList.remove("hidden");
    document.addEventListener("keydown", onPopupEscPress);
};

var closePopup = function () {
    userDialog.classList.add("hidden");
    userDialog.style.top = "";
    userDialog.style.left = "";
    document.removeEventListener("keydown", onPopupEscPress);
};

setupOpen.addEventListener("click", function () {
    openPopup();
});

setupOpen.addEventListener("keydown", function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        openPopup();
    }
});

setupClose.addEventListener("click", function () {
    closePopup();
});

setupClose.addEventListener("keydown", function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
    }
});


/*------------------------------------------------------------------------------------------------------------------*/
var dialogHandler = userDialog.querySelector(".upload");

dialogHandler.addEventListener("mousedown", function (evt) {
    evt.preventDefault();

    var startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };

        userDialog.style.top = (userDialog.offsetTop - shift.y) + "px";
        userDialog.style.left = (userDialog.offsetLeft - shift.x) + "px";
    };

    var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if(dragged) {
            var onClickPreventDefault = function (evt) {
                evt.preventDefault();
                dialogHandler.removeEventListener("click", onClickPreventDefault)
            };
            dialogHandler.addEventListener("click", onClickPreventDefault);
        }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});
/*------------------------------------------------------------------------------------------------------------------*/


userNameInput.addEventListener("invalid", function (evt) {
    if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity("Имя должно состоять минимум из 2 символов");
    } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity("Имя не должно превышать 25 символов");
    } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity("Обязательное поле");
    } else {
        userNameInput.setCustomValidity("");
    }
});
/*------------------------------------------------------------------------------------------------------------------*/
var wizardCoatColor = document.querySelector(".setup-wizard .wizard-coat");
var wizardEyesColor = document.querySelector(".setup-wizard .wizard-eyes");
var wizardFireballColor = document.querySelector(".setup-fireball-wrap");
var coatHiddenInput = document.querySelector("input[name='coat-color']");
var eyesHiddenInput = document.querySelector("input[name='eyes-color']");
var fireballHiddenInput = document.querySelector("input[name='fireball-color']");

wizardCoatColor.addEventListener("click", function () {
    let choosenCoatColor = COAT_COLORS_ARRAY[Math.floor(Math.random() * COAT_COLORS_ARRAY.length)];
    this.style.fill = choosenCoatColor;
    coatHiddenInput.value = choosenCoatColor;
});

wizardEyesColor.addEventListener("click", function () {
    let choosenEyesColor = EYES_COLORS_ARRAY[Math.floor(Math.random() * EYES_COLORS_ARRAY.length)];
    this.style.fill = choosenEyesColor;
    eyesHiddenInput.value = choosenEyesColor;
});

wizardFireballColor.addEventListener("click", function () {
    let choosenFireballColor = FIREBALL_COLORS_ARRAY[Math.floor(Math.random() * FIREBALL_COLORS_ARRAY.length)];
    this.style.background = choosenFireballColor;
    fireballHiddenInput.value = choosenFireballColor;
});
