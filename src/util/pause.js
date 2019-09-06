"use strict";
exports.__esModule = true;
var pause = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    });
};
exports.pause = pause;
//# sourceMappingURL=pause.js.map