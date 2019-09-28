var userDialog = document.querySelector(".setup");
userDialog.classList.remove("hidden");

var similarListElement = document.querySelector(".setup-similar-list");

var similarWizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");

var arrayOfWizards = [];
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

var generateWizardData = function () {
    var fullName = "";

    for (var i = 0; i < 4; i++) {
        var choosenFirstName = FIRST_NAMES_ARRAY[Math.floor(Math.random() * FIRST_NAMES_ARRAY.length)];
        var choosenLastName = SECOND_NAMES_ARRAY[Math.floor(Math.random() * SECOND_NAMES_ARRAY.length)];
        fullName = choosenFirstName + " " + choosenLastName;

        var choosenCoatColor = COAT_COLORS_ARRAY[Math.floor(Math.random() * COAT_COLORS_ARRAY.length)];
        var choosenEyesColor = EYES_COLORS_ARRAY[Math.floor(Math.random() * EYES_COLORS_ARRAY.length)];

        arrayOfWizards.push({
            name : fullName,
            coatColor : choosenCoatColor,
            eyesColor : choosenEyesColor
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