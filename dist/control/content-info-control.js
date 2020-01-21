"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_control_1 = require("./base-control");
var content_info_dao_1 = require("../dao/content-info-dao");
var ContentInfoControl = /** @class */ (function (_super) {
    __extends(ContentInfoControl, _super);
    function ContentInfoControl(req, res) {
        var _this = _super.call(this, req, res) || this;
        _this.req = req;
        _this.res = res;
        return _this;
    }
    ContentInfoControl.prototype.execute = function (action) {
        switch (action) {
            case 'SELECT_BY_BOOKINFO':
                this.selectByBookInfo();
                return;
            default:
                return;
        }
    };
    /**
     *
     */
    ContentInfoControl.prototype.selectByBookInfo = function () {
        var _this = this;
        content_info_dao_1.ContentInfoDao.selectByBookInfo(this.req.body).then(function (res) {
            _this.res.send(res);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    return ContentInfoControl;
}(base_control_1.BaseControl));
exports.ContentInfoControl = ContentInfoControl;
//# sourceMappingURL=content-info-control.js.map