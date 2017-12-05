import { Inject, Injectable } from '@hapiness/core';
import { SequelizeClientExt } from '../sequelize.extension';
import { SequelizeClientManager } from '../managers';
import * as Sequelize from 'sequelize';
import { Observable } from 'rxjs/Observable';
import { Debugger } from '../shared';

const __debugger = new Debugger('SequelizeClientService');

@Injectable()
export class SequelizeClientService {
    private _client: Sequelize.Sequelize;

    constructor( @Inject(SequelizeClientExt) private _sequelizeManager: SequelizeClientManager) {
        this._client = this._sequelizeManager.client;
    }

    public get connection(): Sequelize.Sequelize {
        return this._client;
    }

    public testConnection(): Observable<void> {
        return Observable.create(observer => {
            this._client
                .authenticate()
                .catch(err => {
                    __debugger.debug('connect', `connection failed ${JSON.stringify(err, null, 2)}`);
                    observer.error(err);
                })
                .then(_ => {
                    __debugger.debug('connect', `connected to ${this._client.getDialect()}`);
                    observer.next(_);
                    observer.complete();
                });
        });
    }
}
