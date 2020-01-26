"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbutils_1 = require("../db/dbutils");
var SummaryTestInfoDao = /** @class */ (function () {
    function SummaryTestInfoDao() {
    }
    SummaryTestInfoDao.insert = function (title) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.run(_this.INSERT_SQL, [title], function (error) {
                    if (error) {
                        db.close();
                        console.error('Error!', error);
                        reject(error);
                        return;
                    }
                    else {
                        db.all(_this.SELECT_CREATED_ID_SQL, title, function (error, rows) {
                            if (error) {
                                db.close();
                                console.error('Error!', error);
                                reject(error);
                                return;
                            }
                            else {
                                resolve(rows[0]['id']);
                                db.close();
                            }
                        });
                    }
                });
            });
        });
    };
    SummaryTestInfoDao.INSERT_SQL = "\n        insert into summaryTestInfo(title) values(?)\n    ";
    SummaryTestInfoDao.SELECT_CREATED_ID_SQL = "\n        select id from summaryTestInfo where title = ? order by createdDate desc\n    ";
    return SummaryTestInfoDao;
}());
exports.SummaryTestInfoDao = SummaryTestInfoDao;
//# sourceMappingURL=summary-test-info-dao.js.map