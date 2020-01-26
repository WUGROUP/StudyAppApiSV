import { DbUtils } from "../db/dbutils";

export class TestRelationInfo {

    private static readonly INSERT_SQL = `
        insert into testRelationInfo values 
    `;

    public static insert(summaryId: number, mainIds: number[]) {

        let insertSQL = this.INSERT_SQL;
        for (let i = 0; i < mainIds.length; i++) {
            if (i > 0) {
                insertSQL = insertSQL + ','
            }
            insertSQL = insertSQL + `(${summaryId},${mainIds[i]})`
        }

        return new Promise((resolve, reject) => {
            const db = DbUtils.DbInstance;
            db.serialize(() => {
                db.run(insertSQL, (error) => {
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
}