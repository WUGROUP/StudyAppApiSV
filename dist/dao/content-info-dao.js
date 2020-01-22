"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbutils_1 = require("../db/dbutils");
var ContentInfoDao = /** @class */ (function () {
    function ContentInfoDao() {
    }
    ContentInfoDao.selectByBookInfo = function (contentInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.all(_this.SELECT_BY_BOOKINFO_SQL, [contentInfo.bookId, contentInfo.courseIndex, contentInfo.type], function (error, rows) {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    }
                    else {
                        // const textBoxInfos = new Array<TextBoxInfo>();
                        // rows.forEach(
                        //     (row) => {
                        //         const info = new TextBoxInfo();
                        //         info.id = row.id;
                        //         info.titile = row.titile;
                        //         info.courseCount = row.courseCount;
                        //         textBoxInfos.push(info);
                        //     }
                        // )
                        resolve(rows);
                    }
                });
            });
            db.close();
        });
    };
    ContentInfoDao.insert = function (contentInfos) {
        var insertSQL = this.INSERT;
        for (var i = 0; i < contentInfos.length; i++) {
            if (i > 0) {
                insertSQL = insertSQL + ',';
            }
            insertSQL = insertSQL + ("(" + contentInfos[i].mainId + ",'" + contentInfos[i].content + "','" + contentInfos[i].content1 + "','" + contentInfos[i].content2 + "')");
        }
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.run(insertSQL, null, function (error) {
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
    ContentInfoDao.delete = function (ids) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                var sql = _this.DELETE_SQL.replace('?', ids.join(','));
                db.run(sql, function (error) {
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
    ContentInfoDao.update = function (info) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.run(_this.UPDATE_SQL, [info.content, info.content1, info.content2, info.id], function (error) {
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
    ContentInfoDao.SELECT_BY_BOOKINFO_SQL = "\n            SELECT \n                b.id,\n                a.id as mainId,\n                a.bookId,\n                a.courseIndex,\n                b.content,\n                b.content1,\n                b.content2\n            FROM\n                mainInfo a\n            JOIN \n                contentInfo b\n            ON \n                a.id = b.mainId\n            WHERE\n                a.bookId=?\n            AND\n                a.courseIndex=?\n            AND\n                a.type=?\n            ORDER BY\n                b.id\n    ";
    ContentInfoDao.SELECT_BY_ID = "\n            SELECT \n                id,\n                mainId,\n                content,\n                content1,\n                content2 \n            FROM\n                contentInfo\n            WHERE\n                id=?\n    ";
    ContentInfoDao.INSERT = "\n            INSERT INTO  contentInfo (\n                mainId,\n                content,\n                content1,\n                content2 \n                )\n                VALUES \n    ";
    ContentInfoDao.DELETE_SQL = "\n        delete from contentInfo where id in (?)\n    ";
    ContentInfoDao.UPDATE_SQL = "\n        update  contentInfo set content=?,content1 =?,content2 =? where id = ?\n    ";
    return ContentInfoDao;
}());
exports.ContentInfoDao = ContentInfoDao;
//# sourceMappingURL=content-info-dao.js.map