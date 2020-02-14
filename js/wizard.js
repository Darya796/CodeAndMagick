'use strict';

(function () {
    var userDialog = document.querySelector(".setup");
    var similarListElement = document.querySelector(".setup-similar-list");
    var coatColor;
    var eyesColor;
    var wizards = [];

    var getRank = function (wizard) {
        var rank = 0;

        if (wizard.colorCoat === coatColor) {
            rank += 2;
        }
        if (wizard.colorEyes === eyesColor) {
            rank += 1;
        }

        return rank;
    };

    var namesComparator = function (left, right) {
        if (left > right) {
            return 1;
        }
        else if (left < right) {
            return -1;
        }
        else {
            return 0;
        }
    };

    var updateWizards = function () {
        var uniqueWizards = wizards.sort(function (left, right) {
            var rankDiff = getRank(right) - getRank(left);
            if (rankDiff === 0) {
                rankDiff = namesComparator(left.name, right.name);
            }
            return rankDiff;
        });


        var fragment = document.createDocumentFragment();

        for (var i = 0; i < 4; i++) {
            fragment.appendChild(window.renderWizard(uniqueWizards[i]));
        }

        while (similarListElement.firstChild) {
            similarListElement.removeChild(similarListElement.firstChild);
        }
        similarListElement.appendChild(fragment);
        userDialog.querySelector(".setup-similar").classList.remove("hidden");
    };


    window.wizard = {
        onEyesChange: function (color) {
            eyesColor = color;
            window.debounce(updateWizards);
        },
        onCoatChange: function (color) {
            coatColor = color;
            window.debounce(updateWizards);
        }
    };

    var onLoad = function (data) {
        wizards = data;
        updateWizards();
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
})();