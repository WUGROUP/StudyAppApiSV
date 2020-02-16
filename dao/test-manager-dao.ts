import { DbUtils } from "../db/dbutils";

export class TestManagerDao {

    private static readonly GET_TESTINFS_SQL = `
            SELECT 
                a.id,
                a.title,
                a.bookId,
                a.courseIndex,
                a.type,
                count(b.id) as contentsCount
            FROM
                mainInfo a
            JOIN
                contentInfo b
            ON
                a.id = b.mainId 
            WHERE
                a.bookId=?
            GROUP BY
                a.courseIndex,a.type
            ORDER BY
                a.courseIndex DESC
   `;

    private static readonly GET_ALL_TESTED_INFO_BY_ID = `
                SELECT 
                a.id,
                a.mainId,
                c.type,
                a.content,
                a.content1,
                a.content2,
                b.answer,
                datetime(b.createdDate, '+9 hours') as createdDate
                FROM contentInfo a
                join 
                contentResInfo b
                on
                a.id = b.contentId
                JOIN
                mainInfo c
                on 
                a.mainId = c.id
                WHERE
                b.summaryId = ?
                ORDER by 
                c.type,
                a.id,
                b.createdDate
   `;

    public static selectAll(param: { bookId: number }) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.GET_TESTINFS_SQL, param.bookId, (error, rows) => {
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

    public static getAllTestedInfosById(id: number) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.GET_ALL_TESTED_INFO_BY_ID, id, (error, rows) => {
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
}