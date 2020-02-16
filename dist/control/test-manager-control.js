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
var test_manager_dao_1 = require("../dao/test-manager-dao");
var summary_test_info_dao_1 = require("../dao/summary-test-info-dao");
var test_relation_info_dao_1 = require("../dao/test-relation-info-dao");
var summary_test_info_1 = require("../dto/summary-test-info");
var main_info_1 = require("../dto/main-info");
var content_info_dao_1 = require("../dao/content-info-dao");
var TestManagerControl = /** @class */ (function (_super) {
    __extends(TestManagerControl, _super);
    function TestManagerControl(req, res) {
        var _this = _super.call(this, req, res) || this;
        _this.req = req;
        _this.res = res;
        return _this;
    }
    TestManagerControl.prototype.execute = function (action) {
        switch (action) {
            case 'TODO_LIST':
                this.getAllTodoList();
                return;
            case 'TEST_LIST':
                this.getAllTestInfos();
                return;
            case 'SAVE_TEST':
                this.saveTestRes();
                return;
            case 'TESTED_LIST':
                this.getAllTestedList();
                return;
            case 'GET_ALL_TESTED_INFO_BY_ID':
                this.getAllTestedInfosById();
                return;
            default:
                return;
        }
    };
    TestManagerControl.prototype.getAllTestInfos = function () {
        var _this = this;
        summary_test_info_dao_1.SummaryTestInfoDao.getTestInfosById(this.req.body).then(function (res) {
            _this.res.json(res);
        }).catch(function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.saveTestRes = function () {
        var _this = this;
        var resInfo = this.req.body;
        summary_test_info_dao_1.SummaryTestInfoDao.updateTestResById(resInfo).then(function () {
            _this.saveContentsRes(resInfo.res);
        }).catch(function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.saveContentsRes = function (res) {
        var _this = this;
        content_info_dao_1.ContentInfoDao.insertContentRes(res).then(function () {
            _this.res.json(true);
        }).catch(function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.selectAll = function () {
        var _this = this;
        test_manager_dao_1.TestManagerDao.selectAll(this.req.body).then(function (res) {
            _this.res.json(res);
        }).catch(function () {
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.insert = function () {
        var _this = this;
        var reqParam = this.req.body;
        // insert summaryTestInfo
        summary_test_info_dao_1.SummaryTestInfoDao.insert(reqParam.title, reqParam.countTimeFlg).then(function (id) {
            _this.insertRelationInfo(id, reqParam.mainIds);
        }).catch(function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.insertRelationInfo = function (id, mainIds) {
        var _this = this;
        test_relation_info_dao_1.TestRelationInfo.insert(id, mainIds).then(function () { return _this.res.send(_this.OK_RES); }).catch(function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.getAllTodoList = function () {
        var _this = this;
        summary_test_info_dao_1.SummaryTestInfoDao.getAllTodoList().then(function (rows) {
            var res = new Array();
            var tmpId = -1;
            var summaryTestInfo = new summary_test_info_1.SummaryTestInfoDto();
            var allInfos = rows;
            allInfos.forEach(function (info) {
                if (info.id !== tmpId) {
                    tmpId = info.id;
                    summaryTestInfo = new summary_test_info_1.SummaryTestInfoDto();
                    summaryTestInfo.id = info.id;
                    summaryTestInfo.title = info.title;
                    summaryTestInfo.countTimeFlg = info.countTimeFlg;
                    summaryTestInfo.mainInfos = new Array();
                    res.push(summaryTestInfo);
                }
                var mainInfo = new main_info_1.MainInfo();
                mainInfo.id = info.mainId;
                mainInfo.title = info.mainTitle;
                mainInfo.type = info.type;
                mainInfo.contentsCount = info.contentsCount;
                summaryTestInfo.mainInfos.push(mainInfo);
            });
            _this.res.json(res);
        }, function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.getAllTestedList = function () {
        var _this = this;
        summary_test_info_dao_1.SummaryTestInfoDao.getTestedList().then(function (rows) {
            var res = new Array();
            var tmpId = -1;
            var summaryTestInfo = new summary_test_info_1.SummaryTestInfoDto();
            var allInfos = rows;
            allInfos.forEach(function (info) {
                if (info.id !== tmpId) {
                    tmpId = info.id;
                    summaryTestInfo = new summary_test_info_1.SummaryTestInfoDto();
                    summaryTestInfo.id = info.id;
                    summaryTestInfo.title = info.title;
                    summaryTestInfo.countTimeFlg = info.countTimeFlg;
                    summaryTestInfo.mainInfos = new Array();
                    summaryTestInfo.costedTime = info.costedTime;
                    summaryTestInfo.score = info.score,
                        res.push(summaryTestInfo);
                }
                var mainInfo = new main_info_1.MainInfo();
                mainInfo.id = info.mainId;
                mainInfo.title = info.mainTitle;
                mainInfo.type = info.type;
                mainInfo.contentsCount = info.contentsCount;
                summaryTestInfo.mainInfos.push(mainInfo);
            });
            _this.res.json(res);
        }, function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.getAllTestedInfosById = function () {
        var _this = this;
        var reqParam = this.req.body;
        test_manager_dao_1.TestManagerDao.getAllTestedInfosById(reqParam.id).then(function (rows) {
            _this.res.json(rows);
        }).catch(function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    return TestManagerControl;
}(base_control_1.BaseControl));
exports.TestManagerControl = TestManagerControl;
//# sourceMappingURL=test-manager-control.js.map