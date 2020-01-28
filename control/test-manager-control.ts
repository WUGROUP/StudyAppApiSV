import { BaseControl } from "./base-control";
import express from 'express'
import { TestManagerDao } from "../dao/test-manager-dao";
import { SummaryTestInfoDao } from "../dao/summary-test-info-dao";
import { TestRelationInfo } from "../dao/test-relation-info-dao";
import { SummaryTestInfoDto } from "../dto/summary-test-info";
import { MainInfo } from "../dto/main-info";

export class TestManagerControl extends BaseControl {
    constructor(public req: express.Request, public res: express.Response) {
        super(req, res);
    }

    public execute(action: string) {
        switch (action) {
            case 'TODO_LIST':
                this.getAllTodoList();
                return;
            default:
                return
        }
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
        const reqParam = this.req.body as { title: string, mainIds: number[] };
        // insert summaryTestInfo
        SummaryTestInfoDao.insert<number>(reqParam.title).then(
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
}