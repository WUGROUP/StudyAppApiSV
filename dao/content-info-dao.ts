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

}