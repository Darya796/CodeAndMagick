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


    /*--------------------------------------------------------------------------------*/
    /*  ОТПРАВКА ДАННЫХ ИЗ ФОРМЫ  */

    var form = userDialog.querySelector(".setup-wizard-form");

    var onLoad = function (response) {
        console.log(response);
        userDialog.classList.add("hidden");
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

    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        window.backend.save(new FormData(form), onLoad, onError);
    });
})();