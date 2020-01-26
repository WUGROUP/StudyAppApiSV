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
}