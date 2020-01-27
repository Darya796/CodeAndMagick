//  ФАЙЛ DIALOG.JS
'use strict';

(function () {
    /*  ОТКРЫТИЕ / ЗАКРЫТИЕ ОКНА  */

    var userDialog = document.querySelector(".setup");
    var dialogOpen = document.querySelector(".setup-open");
    var dialogClose = document.querySelector(".setup-close");

    var onPopupEscPress = function (evt) {
        window.utils.isEscEvent(evt, closePopup);
        // window.utils.isEscEvent(evt, function () {
            // if (userNameInput.validity.valid === true) {
            //     closePopup();
            // }
        // });
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

    dialogOpen.addEventListener("click", function () {
        openPopup();
    });

    dialogOpen.addEventListener("keydown", function (evt) {
        window.utils.isEnterEvent(evt, openPopup);
    });

    dialogClose.addEventListener("click", function () {
        closePopup();
    });

    dialogClose.addEventListener("keydown", function (evt) {
        window.utils.isEnterEvent(evt, closePopup);
    });


    /*--------------------------------------------------------------------------------*/
    /*  DRAG'N'DROP  */

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

            if (dragged) {
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


    /*--------------------------------------------------------------------------------*/
    /*  ВАЛИДАЦИЯ ПОЛЯ С ИМЕНЕМ МАГА  */

    var userNameInput = document.querySelector(".setup-user-name");

    userNameInput.addEventListener("invalid", function () {
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
})();