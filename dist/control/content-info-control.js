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
var main_info_1 = require("../dto/main-info");
var main_info_dao_1 = require("../dao/main-info-dao");
var util_1 = require("util");
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
            case 'SAVE_ALL':
                this.saveAll();
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
    ContentInfoControl.prototype.insert = function () {
        var _this = this;
        content_info_dao_1.ContentInfoDao.insert(this.req.body).then(function (res) {
            _this.res.send(_this.OK_RES);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    ContentInfoControl.prototype.saveAll = function () {
        var _this = this;
        var saveInfoPromise = null;
        var deleteInfoPromise = null;
        var updateInfoPromise = null;
        var saveInfo = this.req.body;
        if (saveInfo.noMainInfoFlg) {
            // save main info
            var mainInfo = new main_info_1.MainInfo();
            mainInfo.bookId = saveInfo.bookId;
            mainInfo.courseIndex = saveInfo.courseIndex;
            mainInfo.type = saveInfo.type;
            mainInfo.title = saveInfo.title;
            main_info_dao_1.MainInfoDao.insert(mainInfo).then(function (res) {
                var tmp = res;
                saveInfo.mainId = tmp[0].id;
                saveInfoPromise = _this.saveNewInfos(saveInfo.mainId, saveInfo.infos);
                deleteInfoPromise = _this.deleteInfos(saveInfo.infos);
                updateInfoPromise = _this.updateInfos(saveInfo.infos);
                Promise.all([saveInfoPromise, deleteInfoPromise, updateInfoPromise]).then(function () {
                    _this.res.send(_this.OK_RES);
                }).catch(function (error) {
                    console.error(error);
                    _this.res.sendStatus(500);
                });
            }).catch(function () { return _this.res.sendStatus(500); });
        }
        else {
            saveInfoPromise = this.saveNewInfos(saveInfo.mainId, saveInfo.infos);
            deleteInfoPromise = this.saveNewInfos(saveInfo.mainId, saveInfo.infos);
            updateInfoPromise = this.saveNewInfos(saveInfo.mainId, saveInfo.infos);
            Promise.all([saveInfoPromise, deleteInfoPromise, updateInfoPromise]).then(function () {
                _this.res.send(_this.OK_RES);
            }).catch(function (error) {
                console.error(error);
                _this.res.sendStatus(500);
            });
        }
    };
    ContentInfoControl.prototype.saveNewInfos = function (mainId, infos) {
        var newList = infos.filter(function (v) {
            if (!util_1.isNullOrUndefined(v.content) && !util_1.isNullOrUndefined(v.content1) && util_1.isNullOrUndefined(v.id)) {
                v.mainId = mainId;
                return v;
            }
        });
        if (util_1.isNullOrUndefined(newList) || newList.length === 0) {
            return null;
        }
        return content_info_dao_1.ContentInfoDao.insert(newList);
    };
    ContentInfoControl.prototype.deleteInfos = function (infos) {
        var deleteList = infos.filter(function (v) { return util_1.isNullOrUndefined(v.content) && !util_1.isNullOrUndefined(v.id); }).map(function (info) {
            return info.id;
        });
        if (util_1.isNullOrUndefined(deleteList) || deleteList.length === 0) {
            return null;
        }
        return content_info_dao_1.ContentInfoDao.delete(deleteList);
    };
    ContentInfoControl.prototype.updateInfos = function (infos) {
        var updateList = infos.filter(function (v) { return !util_1.isNullOrUndefined(v.content) && !util_1.isNullOrUndefined(v.id); });
        if (util_1.isNullOrUndefined(updateList) || updateList.length === 0) {
            return null;
        }
        var res = new Array();
        updateList.forEach(function (info) {
            res.push(content_info_dao_1.ContentInfoDao.update(info));
        });
        return Promise.all(res);
    };
    return ContentInfoControl;
}(base_control_1.BaseControl));
exports.ContentInfoControl = ContentInfoControl;
//# sourceMappingURL=content-info-control.js.map