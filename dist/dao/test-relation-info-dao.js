"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbutils_1 = require("../db/dbutils");
var TestRelationInfo = /** @class */ (function () {
    function TestRelationInfo() {
    }
    TestRelationInfo.insert = function (summaryId, mainIds) {
        var insertSQL = this.INSERT_SQL;
        for (var i = 0; i < mainIds.length; i++) {
            if (i > 0) {
                insertSQL = insertSQL + ',';
            }
            insertSQL = insertSQL + ("(" + summaryId + "," + mainIds[i] + ")");
        }
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.run(insertSQL, function (error) {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    }
                    else {
                        resolve();
                    }
                });
            });
            db.close();
        });
    };
    TestRelationInfo.INSERT_SQL = "\n        insert into testRelationInfo values \n    ";
    return TestRelationInfo;
}());
exports.TestRelationInfo = TestRelationInfo;
//# sourceMappingURL=test-relation-info-dao.js.map