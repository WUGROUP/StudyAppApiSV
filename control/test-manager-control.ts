import { BaseControl } from "./base-control";
import express from 'express'
import { TestManagerDao } from "../dao/test-manager-dao";
import { SummaryTestInfoDao } from "../dao/summary-test-info-dao";
import { TestRelationInfo } from "../dao/test-relation-info-dao";
import { SummaryTestInfoDto } from "../dto/summary-test-info";
import { MainInfo } from "../dto/main-info";
import { TestInfo } from "../dto/test-info";
import { ContentInfoDao } from "../dao/content-info-dao";

export class TestManagerControl extends BaseControl {
    constructor(public req: express.Request, public res: express.Response) {
        super(req, res);
    }

    public execute(action: string) {
        switch (action) {
            case 'TODO_LIST':
                this.getAllTodoList();
                return;
            case 'TEST_LIST':
                this.getAllTestInfos();
                return;
            case 'SAVE_TEST':
                this.saveTestRes();
                return;
            case 'TESTED_LIST':
                this.getAllTestedList();
                return;
            default:
                return
        }
    }


    protected getAllTestInfos() {
        SummaryTestInfoDao.getTestInfosById(this.req.body).then(
            (res) => {
                this.res.json(res);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected saveTestRes() {
        const resInfo = this.req.body as { score: number; costTime: number; res: TestInfo[] };
        SummaryTestInfoDao.updateTestResById(resInfo).then(
            () => {
                this.saveContentsRes(resInfo.res);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }


    private saveContentsRes(res: TestInfo[]) {
        ContentInfoDao.insertContentRes(res).then(
            () => {
                this.res.json(true);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected selectAll() {
        TestManagerDao.selectAll(this.req.body).then(
            (res) => {
                this.res.json(res);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected insert() {
        const reqParam = this.req.body as { title: string, countTimeFlg: number, mainIds: number[] };
        // insert summaryTestInfo
        SummaryTestInfoDao.insert<number>(reqParam.title, reqParam.countTimeFlg).then(
            (id) => {
                this.insertRelationInfo(id, reqParam.mainIds);
            }
        ).catch(
            (error) => {
                console.error(error);
                this.res.sendStatus(500);
            }
        )

    }

    private insertRelationInfo(id: number, mainIds: number[]) {
        TestRelationInfo.insert(id, mainIds).then(
            () => this.res.send(this.OK_RES)
        ).catch(
            (error) => {
                this.res.sendStatus(500);
            }
        )
    }

    private getAllTodoList() {
        SummaryTestInfoDao.getAllTodoList().then(
            (rows) => {
                const res = new Array<SummaryTestInfoDto>();
                let tmpId = -1;
                let summaryTestInfo: SummaryTestInfoDto = new SummaryTestInfoDto();
                const allInfos = rows as {
                    id: number,
                    countTimeFlg: number,
                    title: string,
                    mainId: number,
                    mainTitle: string,
                    type: number,
                    contentsCount: number
                }[];
                allInfos.forEach(info => {
                    if (info.id !== tmpId) {
                        tmpId = info.id;
                        summaryTestInfo = new SummaryTestInfoDto();
                        summaryTestInfo.id = info.id;
                        summaryTestInfo.title = info.title;
                        summaryTestInfo.countTimeFlg = info.countTimeFlg;
                        summaryTestInfo.mainInfos = new Array<MainInfo>();
                        res.push(summaryTestInfo);
                    }
                    const mainInfo = new MainInfo();
                    mainInfo.id = info.mainId;
                    mainInfo.title = info.mainTitle;
                    mainInfo.type = info.type;
                    mainInfo.contentsCount = info.contentsCount;
                    summaryTestInfo.mainInfos.push(mainInfo);
                });
                this.res.json(res);
            },
            (error) => {
                this.res.sendStatus(500);
            }
        )
    }

    private getAllTestedList() {
        SummaryTestInfoDao.getTestedList().then(
            (rows) => {
                const res = new Array<SummaryTestInfoDto>();
                let tmpId = -1;
                let summaryTestInfo: SummaryTestInfoDto = new SummaryTestInfoDto();
                const allInfos = rows as {
                    id: number,
                    countTimeFlg: number,
                    title: string,
                    mainId: number,
                    mainTitle: string,
                    score: number;
                    costedTime: number;
                    type: number,
                    contentsCount: number
                }[];
                allInfos.forEach(info => {
                    if (info.id !== tmpId) {
                        tmpId = info.id;
                        summaryTestInfo = new SummaryTestInfoDto();
                        summaryTestInfo.id = info.id;
                        summaryTestInfo.title = info.title;
                        summaryTestInfo.countTimeFlg = info.countTimeFlg;
                        summaryTestInfo.mainInfos = new Array<MainInfo>();
                        summaryTestInfo.costedTime = info.costedTime;
                        summaryTestInfo.score = info.score,
                            res.push(summaryTestInfo);
                    }
                    const mainInfo = new MainInfo();
                    mainInfo.id = info.mainId;
                    mainInfo.title = info.mainTitle;
                    mainInfo.type = info.type;
                    mainInfo.contentsCount = info.contentsCount;
                    summaryTestInfo.mainInfos.push(mainInfo);
                });
                this.res.json(res);
            },
            (error) => {
                this.res.sendStatus(500);
            }
        )
    }
}