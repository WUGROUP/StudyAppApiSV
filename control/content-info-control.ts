import { BaseControl } from "./base-control";
import { ContentInfoDao } from "../dao/content-info-dao";
import express from 'express'

export class ContentInfoControl extends BaseControl {

    constructor(public req: express.Request, public res: express.Response) {
        super(req, res);
    }

    public execute(action: string) {
        switch (action) {
            case 'SELECT_BY_BOOKINFO':
                this.selectByBookInfo();
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
}