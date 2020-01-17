import { BaseControl } from "./base-control";
import express from 'express'
import { TextBoxInfoDao } from "../dao/textbox-info-dao";

export class TextBoxControl extends BaseControl {
    constructor(public req: express.Request, public res: express.Response) {
        super(req, res);
    }

    protected insert() {
        TextBoxInfoDao.insert(this.req.body).then(
            () => {
                this.res.send({ result: 'OK' });
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected selectAll() {
        TextBoxInfoDao.selectAll().then(
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
        TextBoxInfoDao.delete(this.req.body).then(
            () => {
                this.res.send({ result: 'OK' });
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }

    protected update() {
        TextBoxInfoDao.update(this.req.body).then(
            () => {
                this.res.send({ result: 'OK' });
            }
        ).catch(
            () => {
                this.res.sendStatus(500);
            }
        )
    }
}