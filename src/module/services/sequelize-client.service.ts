import { Inject, Injectable } from '@hapiness/core';
import { SequelizeExt } from '../sequelize.extension';
import { SequelizeClientManager } from '../managers';
import { Sequelize } from 'sequelize-typescript';
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
    * Close the Sequelize connection
    *
    * @returns void
    */
    public close(): void {
        return this._client.close();
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
