import { DbUtils } from './dbutils';

export class CreateDb {

    public static initDb() {
        const db = DbUtils.DbInstance;
        db.serialize(
            () => {
                db.run('CREATE TABLE IF NOT EXISTS summaryTestInfo (id INTEGER, title TEXT, createdDate TEXT, score INTEGER, costTime INTEGER, createdDate TEXT)');
                db.run('CREATE TABLE IF NOT EXISTS summaryDetailInfo (id INTEGER, summaryTestId INTEGER, contentId INTEGER, contentResId INTEGER)');
                db.run('CREATE TABLE IF NOT EXISTS mainInfo (id INTEGER, title TEXT, createdDate TEXT, summary INTEGER)');
                db.run('CREATE TABLE IF NOT EXISTS contentInfo (id INTEGER,  mainId INTEGER, typeINTEGER, content TEXT, createddate TEXT , baseTime INTEGER)');
                db.run('CREATE TABLE IF NOT EXISTS contentResInfo (id INTEGER, contentId INTEGER, res INTEGER, createddate TEXT)');
            }
        )
        db.close();
    }
}

CreateDb.initDb();

