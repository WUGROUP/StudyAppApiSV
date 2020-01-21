"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbutils_1 = require("../db/dbutils");
var MainInfoDao = /** @class */ (function () {
    function MainInfoDao() {
    }
    MainInfoDao.selectAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.all(_this.SELECT_SQL, function (error, rows) {
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
    MainInfoDao.selectByBookInfo = function (mainInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.all(_this.SELECT_BY_BOOKINFO_SQL, [mainInfo.bookId, mainInfo.courseIndex], function (error, rows) {
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
    MainInfoDao.insert = function (mainInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.run(_this.INSERT_SQL, [mainInfo.title, mainInfo.bookId, mainInfo.courseIndex, mainInfo.type], function (error) {
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
    MainInfoDao.delete = function (info) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                var sql = _this.DELETE_SQL.replace('?', info.join(','));
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
    MainInfoDao.update = function (info) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var db = dbutils_1.DbUtils.DbInstance;
            db.serialize(function () {
                db.run(_this.UPDATE_SQL, [info.title, info.courseCount, info.id], function (error) {
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
    MainInfoDao.SELECT_SQL = "\n        select \n           id,title,bookId,courseIndex,type,summary,createdDate\n        from \n           mainInfo \n        order by \n            createdDate\n    ";
    MainInfoDao.SELECT_BY_BOOKINFO_SQL = "\n        select \n           id,title,bookId,courseIndex,type,summary,createdDate\n        from \n           mainInfo \n        where \n           bookId=? and courseIndex=?\n    ";
    MainInfoDao.INSERT_SQL = "\n        insert into mainInfo(title,bookId,courseIndex,type) values(?,?,?,?);\n    ";
    MainInfoDao.DELETE_SQL = "\n        delete from mainInfo where id in (?)\n    ";
    MainInfoDao.UPDATE_SQL = "\n        update  mainInfo set summary=? where id = ?\n    ";
    return MainInfoDao;
}());
exports.MainInfoDao = MainInfoDao;
//# sourceMappingURL=main-info-dao.js.map