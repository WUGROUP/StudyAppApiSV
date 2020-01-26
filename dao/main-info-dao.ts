import { DbUtils } from "../db/dbutils";
import { TextBoxInfo } from "../dto/text-box";
import { MainInfo } from "../dto/main-info";

export class MainInfoDao {
    public static SELECT_SQL = `
        select 
           id,title,bookId,courseIndex,type,summary,createdDate
        from 
           mainInfo 
        order by 
            createdDate
    `;
    public static SELECT_BY_BOOKINFO_SQL = `
        select 
           id,title,bookId,courseIndex,type,summary,createdDate
        from 
           mainInfo 
        where 
           bookId=? and courseIndex=? and type=?
    `;
    public static INSERT_SQL = `
        insert into mainInfo(title,bookId,courseIndex,type) values(?,?,?,?);
    `;

    public static DELETE_SQL = `
        delete from mainInfo where id in (?)
    `;

    public static UPDATE_SQL = `
        update  mainInfo set summary=? where id = ?
    `;

    public static selectAll() {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_SQL, (error, rows) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
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
        }
        );
    }

    public static selectByBookInfo(mainInfo: MainInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_BY_BOOKINFO_SQL, [mainInfo.bookId, mainInfo.courseIndex, mainInfo.type], (error, rows) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        resolve(rows);
                    }
                });
            });
            db.close();
        }
        );
    }

    public static insert(mainInfo: MainInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.INSERT_SQL, [mainInfo.title, mainInfo.bookId, mainInfo.courseIndex, mainInfo.type], (error) => {
                    if (error) {
                        db.close();
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        db.all(this.SELECT_BY_BOOKINFO_SQL, [mainInfo.bookId, mainInfo.courseIndex, mainInfo.type], (error, rows) => {
                            if (error) {
                                db.close();
                                console.error('Error!', error);
                                reject(error);
                                return;
                            } else {
                                resolve(rows);
                                db.close();
                            }
                        });
                    }
                });
            });
        }
        );
    }

    public static delete(info: number[]) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                const sql = this.DELETE_SQL.replace('?', info.join(','));
                db.run(sql, (error) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        resolve();
                    }
                });
            });
            db.close();
        }
        );
    }

    public static update(info: TextBoxInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.UPDATE_SQL, [info.title, info.courseCount, info.id], (error) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        resolve();
                    }
                });
            });
            db.close();
        }
        );
    }
}