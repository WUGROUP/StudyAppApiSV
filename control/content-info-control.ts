import { BaseControl } from "./base-control";
import { ContentInfoDao } from "../dao/content-info-dao";
import express from 'express'
import { ContentInfo } from "../dto/content-info";
import { MainInfo } from "../dto/main-info";
import { MainInfoDao } from "../dao/main-info-dao";
import { isNullOrUndefined } from "util";
import { AppUtils } from "../utils/app-utils";

export class ContentInfoControl extends BaseControl {

    constructor(public req: express.Request, public res: express.Response) {
        super(req, res);
    }

    public execute(action: string) {
        switch (action) {
            case 'SELECT_BY_BOOKINFO':
                this.selectByBookInfo();
                return;
            case 'SAVE_ALL':
                this.saveAll();
                return;
            default:
                return
        }
    }

    /**
     * 
     */
    private selectByBookInfo() {
        ContentInfoDao.selectByBookInfo(this.req.body).then(
            (res) => {
                this.res.send(res);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected insert() {
        ContentInfoDao.insert(this.req.body).then(
            (res) => {
                this.res.send(this.OK_RES);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected saveAll() {
        let saveInfoPromise = null;
        let deleteInfoPromise = null;
        let updateInfoPromise = null;

        const saveInfo = this.req.body as {
            noMainInfoFlg: boolean,
            mainId: number,
            bookId: number,
            courseIndex: number,
            type: number,
            title: string,
            infos: ContentInfo[]
        };

        const mainInfo = new MainInfo();
        mainInfo.bookId = saveInfo.bookId;
        mainInfo.courseIndex = saveInfo.courseIndex;
        mainInfo.type = saveInfo.type;

        // 選択型
        if (saveInfo.type === 3) {
            for (let i = 0; i < saveInfo.infos.length; i++) {
                const contentInfo = saveInfo.infos[i];
                contentInfo.content1 = JSON.stringify(contentInfo.selectItems);
            }
        }

        MainInfoDao.selectByBookInfo(mainInfo).then(
            (rows) => {
                const tmp = rows as MainInfo[];
                if (tmp.length > 0) {
                    saveInfoPromise = this.saveNewInfos(saveInfo.mainId, saveInfo.infos);
                    deleteInfoPromise = this.deleteInfos(saveInfo.infos);
                    updateInfoPromise = this.updateInfos(saveInfo.infos);
                    Promise.all([saveInfoPromise, deleteInfoPromise, updateInfoPromise]).then(
                        () => {
                            this.res.send(this.OK_RES);
                        }
                    ).catch(
                        (error) => {
                            console.error(error);
                            this.res.sendStatus(500);
                        }
                    )
                } else {
                    // save main info
                    const mainInfo = new MainInfo();
                    mainInfo.bookId = saveInfo.bookId;
                    mainInfo.courseIndex = saveInfo.courseIndex;
                    mainInfo.type = saveInfo.type;
                    mainInfo.title = saveInfo.title;

                    MainInfoDao.insert(mainInfo).then(
                        (res) => {
                            const tmp = res as MainInfo[];
                            saveInfo.mainId = tmp[0].id;
                            saveInfoPromise = this.saveNewInfos(saveInfo.mainId, saveInfo.infos);
                            deleteInfoPromise = this.deleteInfos(saveInfo.infos);
                            updateInfoPromise = this.updateInfos(saveInfo.infos);
                            Promise.all([saveInfoPromise, deleteInfoPromise, updateInfoPromise]).then(
                                () => {
                                    this.res.send(this.OK_RES);
                                }
                            ).catch(
                                (error) => {
                                    console.error(error);
                                    this.res.sendStatus(500);
                                }
                            )
                        }
                    ).catch(
                        () => this.res.sendStatus(500)
                    )
                }
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        );
    }

    private saveNewInfos(mainId: number, infos: ContentInfo[]) {
        const newList = infos.filter(
            (v: ContentInfo) => {
                if (!isNullOrUndefined(v.content) && !isNullOrUndefined(v.content1) && isNullOrUndefined(v.id)) {
                    v.mainId = mainId;
                    return v;
                }
            }
        );
        if (isNullOrUndefined(newList) || newList.length === 0) {
            return null;
        }
        return ContentInfoDao.insert(newList);
    }

    private deleteInfos(infos: ContentInfo[]) {
        const deleteList = infos.filter(
            (v: ContentInfo) => AppUtils.isNullorEmpty(v.content) && !isNullOrUndefined(v.id)
        ).map((info) => {
            return info.id;
        });
        if (isNullOrUndefined(deleteList) || deleteList.length === 0) {
            return null;
        }
        return ContentInfoDao.delete(deleteList);
    }

    private updateInfos(infos: ContentInfo[]) {
        const updateList = infos.filter(
            (v: ContentInfo) => !AppUtils.isNullorEmpty(v.content) && !isNullOrUndefined(v.id)
        );
        if (isNullOrUndefined(updateList) || updateList.length === 0) {
            return null;
        }

        let res = new Array();
        updateList.forEach(
            (info) => {
                res.push(ContentInfoDao.update(info));
            }
        )
        return Promise.all(res);
    }
}