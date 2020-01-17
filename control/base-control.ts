import express from 'express'
import { Action } from '../type/types-def';

export class BaseControl {
    constructor(public req: express.Request, public res: express.Response) {
    }

    public processRequest() {
        const action = this.toAction();
        switch (action) {
            case Action.insert:
                this.insert();
                return;
            case Action.delete:
                this.delete();
                return;
            case Action.update:
                this.update();
                return;
            case Action.selectAll:
                this.delete();
                return;
            default:
                this.execute();
                return;
        }
    }

    protected execute() { }


    private toAction(): Action {
        const action = this.req.params['ACTION'];
        switch (action) {
            case 'INSERT':
                return Action.insert;
            case 'DELETE':
                return Action.delete;
            case 'UPDATE':
                return Action.update;
            default:
                return Action.selectAll;
        }
    }

    protected insert() {

    }

    protected update() {

    }

    protected delete() {

    }

    protected selectAll() {

    }
}