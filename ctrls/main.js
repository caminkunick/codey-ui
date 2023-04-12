"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDate = void 0;
var firestore_1 = require("firebase/firestore");
var CDate = /** @class */ (function () {
    function CDate() {
    }
    CDate.toNumber = function (date) {
        if (date instanceof firestore_1.Timestamp) {
            return date.toMillis();
        }
        else if (typeof date === "number") {
            return date;
        }
        else {
            return Date.now();
        }
    };
    return CDate;
}());
exports.CDate = CDate;
