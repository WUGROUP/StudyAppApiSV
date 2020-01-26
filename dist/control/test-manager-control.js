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
var TestManagerControl = /** @class */ (function (_super) {
    __extends(TestManagerControl, _super);
    function TestManagerControl(req, res) {
        var _this = _super.call(this, req, res) || this;
        _this.req = req;
        _this.res = res;
        return _this;
    }
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
        summary_test_info_dao_1.SummaryTestInfoDao.insert(reqParam.title).then(function (id) {
            _this.insertRelationInfo(id, reqParam.mainIds);
        }).catch(function (error) {
            console.error(error);
            _this.res.sendStatus(500);
        });
    };
    TestManagerControl.prototype.insertRelationInfo = function (id, mainIds) {
        var _this = this;
        test_relation_info_dao_1.TestRelationInfo.insert(id, mainIds).then(function () { return _this.res.send(_this.OK_RES); }).catch(function (error) {
            _this.res.sendStatus(500);
        });
    };
    return TestManagerControl;
}(base_control_1.BaseControl));
exports.TestManagerControl = TestManagerControl;
//# sourceMappingURL=test-manager-control.js.map