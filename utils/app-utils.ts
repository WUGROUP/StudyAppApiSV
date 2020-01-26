

export class AppUtils {


    public static isNullorUndefined(obj: any): boolean {
        return obj === null || obj === undefined;
    }

    public static isNullorEmpty(obj: any): boolean {
        return obj === null || obj === undefined || obj === '';
    }

}
