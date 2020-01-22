import { DbUtils } from "../db/dbutils";
import { ContentInfo } from "../dto/content-info";

export class ContentInfoDao {

    private static readonly SELECT_BY_BOOKINFO_SQL = `
            SELECT 
                b.id,
                a.id as mainId,
                a.bookId,
                a.courseIndex,
                b.content,
                b.content1,
                b.content2
            FROM
                mainInfo a
            JOIN 
                contentInfo b
            ON 
                a.id = b.mainId
            WHERE
                a.bookId=?
            AND
                a.courseIndex=?
            AND
                a.type=?
            ORDER BY
                b.id
    `;


    private static readonly SELECT_BY_ID = `
            SELECT 
                id,
                mainId,
                content,
                content1,
                content2 
            FROM
                contentInfo
            WHERE
                id=?
    `;


    private static readonly INSERT = `
            INSERT INTO  contentInfo (
                mainId,
                content,
                content1,
                content2 
                )
                VALUES 
    `;

    public static DELETE_SQL = `
        delete from contentInfo where id in (?)
    `;

    public static UPDATE_SQL = `
        update  contentInfo set content=?,content1 =?,content2 =? where id = ?
    `;

    public static selectByBookInfo(contentInfo: ContentInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_BY_BOOKINFO_SQL, [contentInfo.bookId, contentInfo.courseIndex, contentInfo.type], (error, rows) => {
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

    public static insert(contentInfos: ContentInfo[]) {
        let insertSQL = this.INSERT;
        for (let i = 0; i < contentInfos.length; i++) {
            if (i > 0) {
                insertSQL = insertSQL + ','
            }
            insertSQL = insertSQL + `(${contentInfos[i].mainId},'${contentInfos[i].content}','${contentInfos[i].content1}','${contentInfos[i].content2}')`
        }

        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(insertSQL, null, (error) => {
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
        });
    }

    public static delete(ids: number[]) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                const sql = this.DELETE_SQL.replace('?', ids.join(','));
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


    public static update(info: ContentInfo) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.UPDATE_SQL, [info.content, info.content1, info.content2, info.id], (error) => {
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