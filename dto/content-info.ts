import { SelectInfo } from "./select-info";

export class ContentInfo {
    public id!: number;
    public mainId!: number;
    public bookId!: number;
    public courseIndex!: number;
    public content!: string;
    public content1!: string;
    public content2!: string;
    public createdDate!: string;
    public type!: number;
    public selectItems = new Array<SelectInfo>();
}