import { Inject, Injectable } from '@hapiness/core';
import { SequelizeClientExt } from '../sequelize.extension';
import { SequelizeClientManager } from '../managers';
import * as Sequelize from 'sequelize';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SequelizeClientService {
    private _client: Sequelize.Sequelize;

    constructor( @Inject(SequelizeClientExt) private _sequelizeManager: SequelizeClientManager) {
        this._client = this._sequelizeManager.client;
    }

    public get instance(): Sequelize.Sequelize {
        return this._client;
    }

    public testConnection(): Observable<void> {
            return Observable.fromPromise(this._client.authenticate());
    }
}
