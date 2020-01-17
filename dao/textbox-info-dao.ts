import { DbUtils } from "../db/dbutils";
import { TextBoxInfo } from "../dto/text-box";

export class TextBoxInfoDao {
    public static SELECT_SQL = `
        select * from textBookInfo
    `;

    public static INSERT_SQL = `
        insert into textBookInfo(title,courseCount) values(?,?);
    `;

    public static DELETE_SQL = `
        delete from textBookInfo where id = ?
    `;

    public static selectAll() {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_SQL, null, (error, rows) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        const textBoxInfos = new Array<TextBoxInfo>();
                        rows.forEach(
                            (row) => {
                                const info = new TextBoxInfo();
                                info.id = row.id;
                                info.titile = row.titile;
                                info.courseCount = row.courseCount;
                                textBoxInfos.push(info);
                            }
                        )
                        resolve(textBoxInfos);
                    }
                });
            });
            db.close();
        }
        );
    }

    public static insert(info: TextBoxInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.INSERT_SQL, [info.titile, info.courseCount], (error) => {
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

    public static delete(info: TextBoxInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.DELETE_SQL, info.id, (error) => {
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
            this.delete(info).then(
                () => {
                    this.insert(info).then(
                        () => {
                            resolve();
                        }
                    ).catch(
                        (error) => {
                            reject(error);
                        }
                    )
                }
            ).catch(
                (error) => {
                    reject(error);
                }
            )
        });
    }
}