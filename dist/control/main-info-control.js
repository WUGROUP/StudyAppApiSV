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
var main_info_dao_1 = require("../dao/main-info-dao");
var MainInfoControl = /** @class */ (function (_super) {
    __extends(MainInfoControl, _super);
    function MainInfoControl(req, res) {
        var _this = _super.call(this, req, res) || this;
        _this.req = req;
        _this.res = res;
        return _this;
    }
    MainInfoControl.prototype.execute = function (action) {
        switch (action) {
            case 'SELECT_BY_BOOKINFO':
                this.selectByBookInfo();
                return;
            default:
                return;
        }
    };
    MainInfoControl.prototype.selectByBookInfo = function () {
        var _this = this;
        main_info_dao_1.MainInfoDao.selectByBookInfo(this.req.body).then(function (res) {
            _this.res.send(res);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    MainInfoControl.prototype.insert = function () {
        var _this = this;
        main_info_dao_1.MainInfoDao.insert(this.req.body).then(function () {
            _this.res.send(_this.OK_RES);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    MainInfoControl.prototype.selectAll = function () {
        var _this = this;
        main_info_dao_1.MainInfoDao.selectAll().then(function (res) {
            _this.res.json(res);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    MainInfoControl.prototype.delete = function () {
        var _this = this;
        main_info_dao_1.MainInfoDao.delete(this.req.body).then(function () {
            _this.res.send(_this.OK_RES);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    MainInfoControl.prototype.update = function () {
        var _this = this;
        main_info_dao_1.MainInfoDao.update(this.req.body).then(function () {
            _this.res.send(_this.OK_RES);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    return MainInfoControl;
}(base_control_1.BaseControl));
exports.MainInfoControl = MainInfoControl;
//# sourceMappingURL=main-info-control.js.map