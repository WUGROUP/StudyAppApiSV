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
    ContentInfoDao.SELECT_BY_BOOKINFO_SQL = "\n            SELECT \n                b.id,\n                a.id as mainId,\n                a.bookId,\n                a.courseIndex,\n                b.content,\n                b.content1,\n                b.content2\n            FROM\n                mainInfo a\n            JOIN \n                contentInfo b\n            ON \n                a.id = b.mainId\n            WHERE\n                a.bookId=?\n            AND\n                a.courseIndex=?\n            AND\n                a.type=?\n            ORDER BY\n                b.id\n    ";
    return ContentInfoDao;
}());
exports.ContentInfoDao = ContentInfoDao;
//# sourceMappingURL=content-info-dao.js.map