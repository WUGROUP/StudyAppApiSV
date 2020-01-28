import { SummaryTestInfoDto } from "../dto/summary-test-info";
import { DbUtils } from "../db/dbutils";

export class SummaryTestInfoDao {

    public static INSERT_SQL = `
        insert into summaryTestInfo(title) values(?)
    `;

    public static SELECT_CREATED_ID_SQL = `
        select id from summaryTestInfo where title = ? order by createdDate desc
    `;

    public static SELECT_ALL_TODO_LIST = `
                SELECT
                    a.id,
                    a.title
                    c.id as mainId;
                    c.title as mainTitle,
                    c.type,
                case when c.type=1 then (select count(*) from contentInfo d where a.id=d.mainId and c.type = 1) 
                when c.type = 2 then (select count(*) from contentInfo e where a.id=e.mainId and c.type = 2)
                end as contentsCount
                FROM
                    summaryTestInfo a
                JOIN 
                    testRelationInfo b
                ON 
                    a.id = b.summaryId
                JOIN
                    mainInfo c
                ON
                    b.mainId = c.id

                GROUP BY
                a.title,c.title
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

    public static getAllTodoList() {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_ALL_TODO_LIST, (error, rows) => {
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