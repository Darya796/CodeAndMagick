'use strict';

(function () {
    var lastTimeout;

    window.debounce = function (action) {
        if(lastTimeout) {
            window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
            action();
        }, 500);
    };
})();