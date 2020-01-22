import { BaseControl } from "./base-control";
import express from 'express'
import { MainInfoDao } from "../dao/main-info-dao";

export class MainInfoControl extends BaseControl {
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

    private selectByBookInfo() {
        MainInfoDao.selectByBookInfo(this.req.body).then(
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
        MainInfoDao.insert(this.req.body).then(
            () => {
                this.res.send(this.OK_RES);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected selectAll() {
        MainInfoDao.selectAll().then(
            (res) => {
                this.res.json(res);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected delete() {
        MainInfoDao.delete(this.req.body).then(
            () => {
                this.res.send(this.OK_RES);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected update() {
        MainInfoDao.update(this.req.body).then(
            () => {
                this.res.send(this.OK_RES);
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }
}