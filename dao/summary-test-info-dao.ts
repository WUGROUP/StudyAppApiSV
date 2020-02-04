
import { DbUtils } from "../db/dbutils";
import { TestInfo } from "../dto/test-info";

export class SummaryTestInfoDao {

    public static INSERT_SQL = `
        insert into summaryTestInfo(title,countTimeFlg) values(?,?)
    `;

    public static SELECT_CREATED_ID_SQL = `
        select id from summaryTestInfo where title = ? order by createdDate desc
    `;

    public static SELECT_ALL_TODO_LIST = `
                SELECT
                    a.id,
                    a.countTimeFlg,
					b.mainId,
                    a.title,
				    a.score,
                    c.id as mainId,
                    c.title as mainTitle,
                    c.type,
                case when c.type=1 then (select count(*) from contentInfo d where b.mainId=d.mainId and c.type = 1) 
                when c.type = 2 then (select count(*) from contentInfo e where b.mainId=e.mainId and c.type = 2)
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
                WHERE
				    a.score is null
                GROUP BY
                a.title,c.title
    `;

    public static SELECT_ALL_TESTED_LIST = `
                SELECT
                    a.id,
                    a.countTimeFlg,
					b.mainId,
                    a.title,
                    a.score,
                    a.costTime as costedTime,
                    c.id as mainId,
                    c.title as mainTitle,
                    c.type,
                case when c.type=1 then (select count(*) from contentInfo d where b.mainId=d.mainId and c.type = 1) 
                when c.type = 2 then (select count(*) from contentInfo e where b.mainId=e.mainId and c.type = 2)
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
                WHERE
				    a.score is not null
                GROUP BY
                a.title,c.title
    `;

    private static readonly SELECT_TEST_INFO_BY_ID =
        `
    SELECT
                    a.id as summaryId,
					b.mainId,
                    a.title,
				    a.score,
                    c.id as mainId,
                    c.title as mainTitle,
                    c.type,
                    d.id as contentId,
					d.content,
					d.content1,
					d.content2
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
				JOIN
				   contentInfo d
				ON
				   d.mainId = b.mainId
                WHERE
				    a.id = ?
				ORDER BY
				    c.type,mainTitle
    `;

    private static readonly UPDATE_TEST_RES =
        `
        update summaryTestInfo 
        set score = ? ,
        costTime = ?
        where 
          id = ?
    `

    public static insert<T>(title: string, flg: number) {
        return new Promise<T>((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.INSERT_SQL, [title, flg], (error) => {
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

    public static getTestInfosById(id: { summaryId: number }) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_TEST_INFO_BY_ID, [id.summaryId], (error, rows) => {
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

    public static getTestedList() {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.all(this.SELECT_ALL_TESTED_LIST, (error, rows) => {
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

    public static updateTestResById(testRes: { score: number; costTime: number; res: TestInfo[] }) {
        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(this.UPDATE_TEST_RES, [testRes.score, testRes.costTime, testRes.res[0].summaryId], (error) => {
                    if (error) {
                        console.error('Error!', error);
                        reject(error);
                        return;
                    } else {
                        resolve(true);
                    }
                });
            });
            db.close();
        }
        );
    }
}