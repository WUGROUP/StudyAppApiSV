import * as sqlite3 from 'sqlite3';

export class DbUtils {
    public static readonly dbName = 'studyapp.db';
    public static get DbInstance(): sqlite3.Database {
        const db = new sqlite3.Database('studyapp.db');
        return db;
    }
}