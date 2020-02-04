import { DbUtils } from './dbutils';

export class CreateDb {

    public static initDb() {
        const db = DbUtils.DbInstance;
        db.serialize(
            () => {
                db.run('CREATE TABLE IF NOT EXISTS summaryTestInfo (id INTEGER primary key, title TEXT, score INTEGER, costTime INTEGER, countTimeFlg INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS summaryDetailInfo (id INTEGER primary key,  summaryTestId INTEGER, contentId INTEGER, contentResId INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS mainInfo (id INTEGER primary key, title TEXT, bookId INTEGER, courseIndex INTEGER, type INTEGER, summary INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS mainTestInfo (id INTEGER primary key, mainId INTEGER, costTime INTEGER, score INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS contentInfo (id INTEGER primary key, mainId INTEGER, content TEXT, content1 TEXT, content2 TEXT, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS contentResInfo (id INTEGER primary key, summaryId INTEGER , mainId INTEGER, contentId INTEGER, answer string, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS textBookInfo (id INTEGER primary key, title TEXT, courseCount INTEGER, createdDate default CURRENT_TIMESTAMP)');
                db.run('CREATE TABLE IF NOT EXISTS testRelationInfo (summaryId INTEGER , mainId INTEGER)');
            }
        )
        db.close();
    }
}

CreateDb.initDb();

