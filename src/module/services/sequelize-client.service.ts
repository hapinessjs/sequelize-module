import { Inject } from '@hapiness/core';
import { SequelizeClientManager, SequelizeClientExt } from '../index';
import { Sequelize } from 'sequelize-typescript';

export class SequelizeClientService {
    private _client: Sequelize;

    constructor( @Inject(SequelizeClientExt) private _sequelizeManager: SequelizeClientManager) {
        this._client = this._sequelizeManager.client;
    }

    public get connection(): Sequelize {
        return this._client;
    }
}
