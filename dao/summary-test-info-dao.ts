import { SummaryTestInfoDto } from "../dto/summary-test-info";
import { DbUtils } from "../db/dbutils";

export class SummaryTestInfoDao {

    public static INSERT_SQL = `
        insert into summaryTestInfo(title) values(?)
    `;

    public static SELECT_CREATED_ID_SQL = `
        select id from summaryTestInfo where title = ? order by createdDate desc
    `;

    public static insert<T>(title: string) {
        return new Promise<T>((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.INSERT_SQL, [title], (error) => {
                    if (error) {
                        db.close();
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        db.all(this.SELECT_CREATED_ID_SQL, title, (error, rows) => {
                            if (error) {
                                db.close();
                                console.error('Error!', error);
                                reject(error);
                                return;
                            } else {
                                resolve(rows[0]['id']);
                                db.close();
                            }
                        });
                    }
                });
            });
        }
        );
    }

}