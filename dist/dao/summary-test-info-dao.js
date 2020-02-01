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
    SummaryTestInfoDao.getAllTodoList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.all(_this.SELECT_ALL_TODO_LIST, function (error, rows) {
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
    SummaryTestInfoDao.getTestInfosById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.all(_this.SELECT_TEST_INFO_BY_ID, [id.summaryId], function (error, rows) {
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
    SummaryTestInfoDao.INSERT_SQL = "\n        insert into summaryTestInfo(title) values(?)\n    ";
    SummaryTestInfoDao.SELECT_CREATED_ID_SQL = "\n        select id from summaryTestInfo where title = ? order by createdDate desc\n    ";
    SummaryTestInfoDao.SELECT_ALL_TODO_LIST = "\n                SELECT\n                    a.id,\n\t\t\t\t\tb.mainId,\n                    a.title,\n\t\t\t\t    a.score,\n                    c.id as mainId,\n                    c.title as mainTitle,\n                    c.type,\n                case when c.type=1 then (select count(*) from contentInfo d where b.mainId=d.mainId and c.type = 1) \n                when c.type = 2 then (select count(*) from contentInfo e where b.mainId=e.mainId and c.type = 2)\n                end as contentsCount\n                FROM\n                    summaryTestInfo a\n                JOIN \n                    testRelationInfo b\n                ON \n                    a.id = b.summaryId\n                JOIN\n                    mainInfo c\n                ON\n                    b.mainId = c.id\n                WHERE\n\t\t\t\t    a.score is null\n                GROUP BY\n                a.title,c.title\n    ";
    SummaryTestInfoDao.SELECT_TEST_INFO_BY_ID = "\n    SELECT\n                    a.id,\n\t\t\t\t\tb.mainId,\n                    a.title,\n\t\t\t\t    a.score,\n                    c.id as mainId,\n                    c.title as mainTitle,\n                    c.type,\n                    d.id as contentId,\n\t\t\t\t\td.content,\n\t\t\t\t\td.content1,\n\t\t\t\t\td.content2\n                FROM\n                    summaryTestInfo a\n                JOIN \n                    testRelationInfo b\n                ON \n                    a.id = b.summaryId\n                JOIN\n                    mainInfo c\n                ON\n                    b.mainId = c.id\n\t\t\t\tJOIN\n\t\t\t\t   contentInfo d\n\t\t\t\tON\n\t\t\t\t   d.mainId = b.mainId\n                WHERE\n\t\t\t\t    a.id = ?\n\t\t\t\tORDER BY\n\t\t\t\t    c.type,mainTitle\n    ";
    return SummaryTestInfoDao;
}());
exports.SummaryTestInfoDao = SummaryTestInfoDao;
//# sourceMappingURL=summary-test-info-dao.js.map