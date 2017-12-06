import { Inject, Injectable } from '@hapiness/core';
import { SequelizeExt } from '../sequelize.extension';
import { SequelizeClientManager } from '../managers';
import { Sequelize } from 'sequelize-typescript';
// import * as Sequelize from 'sequelize';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SequelizeClientService {
    private _client: Sequelize;

    constructor( @Inject(SequelizeExt) private _sequelizeManager: SequelizeClientManager) {
        this._client = this._sequelizeManager.client;
    }

    /**
    * Give you the Sequelize instance
    *
    * @returns Sequelize
    */
    public get instance(): Sequelize {
        return this._client;
    }

    /**
    * Test if you can successfully connect to your database.
    *
    * @returns Observable<void>
    */
    public testConnection(): Observable<void> {
        return Observable.fromPromise(this._client.authenticate());
    }
}
