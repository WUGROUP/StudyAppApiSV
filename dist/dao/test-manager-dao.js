"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbutils_1 = require("../db/dbutils");
var TestManagerDao = /** @class */ (function () {
    function TestManagerDao() {
    }
    TestManagerDao.selectAll = function (param) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.all(_this.GET_TESTINFS_SQL, param.bookId, function (error, rows) {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
            db.close();
        });
    };
    TestManagerDao.GET_TESTINFS_SQL = "\n            SELECT \n                a.id,\n                a.title,\n                a.bookId,\n                a.courseIndex,\n                a.type,\n                count(b.id) as contentsCount\n            FROM\n                mainInfo a\n            JOIN\n                contentInfo b\n            ON\n                a.id = b.mainId \n            WHERE\n                a.bookId=?\n            GROUP BY\n                a.courseIndex,a.type\n            ORDER BY\n                a.courseIndex DESC\n   ";
    return TestManagerDao;
}());
exports.TestManagerDao = TestManagerDao;
//# sourceMappingURL=test-manager-dao.js.map