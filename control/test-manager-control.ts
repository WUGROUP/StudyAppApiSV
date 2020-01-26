import { BaseControl } from "./base-control";
import express from 'express'
import { TestManagerDao } from "../dao/test-manager-dao";
import { SummaryTestInfoDao } from "../dao/summary-test-info-dao";
import { TestRelationInfo } from "../dao/test-relation-info-dao";

export class TestManagerControl extends BaseControl {
    constructor(public req: express.Request, public res: express.Response) {
        super(req, res);
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
}