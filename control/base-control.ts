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
                this.selectAll();
                return;
            default:
                this.execute(action);
                return;
        }
    }

    protected execute(action: string) { }


    private toAction(): Action | string {
        const action = this.req.query['ACTION'];
        console.debug(`Action is ${action}`);
        switch (action) {
            case 'INSERT':
                return Action.insert;
            case 'DELETE':
                return Action.delete;
            case 'UPDATE':
                return Action.update;
            case 'SELECT_ALL':
                return Action.selectAll;
            default:
                return action;
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

    protected OK_RES = { result: 'OK' };
    protected NG_RES = { result: 'NG' };
}