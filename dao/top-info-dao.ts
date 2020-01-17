import { DbUtils } from "../db/dbutils";

export class TopInfoDao {
    public static getAllTopInfosSQL = `
        SELECT 
		   b.id,
		   b.createdDate,
           a.title,
           a.type,
		   b.costTime,
		   b.score
        FROM mainInfo a
        JOIN mainTestInfo b
        ON a.id = b.mainId
		ORDER BY b.createdDate
    `;
    public static getAllTopInfos() {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all('SELECT * FROM user', (error, rows) => {
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
