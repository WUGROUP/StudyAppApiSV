"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppUtils = /** @class */ (function () {
    function AppUtils() {
    }
    AppUtils.isNullorUndefined = function (obj) {
        return obj === null || obj === undefined;
    };
    AppUtils.isNullorEmpty = function (obj) {
        return obj === null || obj === undefined || obj === '';
    };
    return AppUtils;
}());
exports.AppUtils = AppUtils;
//# sourceMappingURL=app-utils.js.map