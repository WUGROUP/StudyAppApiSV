import { DbUtils } from './dbutils';

export class CreateDb {

    public static initDb() {
        const db = DbUtils.DbInstance;
        db.serialize(
            () => {
                db.run('CREATE TABLE IF NOT EXISTS summaryTestInfo (id INTEGER, title TEXT, score INTEGER, costTime INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS summaryDetailInfo (id INTEGER, summaryTestId INTEGER, contentId INTEGER, contentResId INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS mainInfo (id INTEGER, title TEXT, type INTEGER, summary INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS mainTestInfo (id INTEGER, mainId INTEGER, costTime INTEGER, score INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS contentInfo (id INTEGER,  mainId INTEGER, content TEXT, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS contentResInfo (id INTEGER, contentId INTEGER, res INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS textBookInfo (id INTEGER primary key, title TEXT, courseCount INTEGER, createdDate default CURRENT_TIMESTAMP)');
            }
        )
        db.close();
    }
}

CreateDb.initDb();

