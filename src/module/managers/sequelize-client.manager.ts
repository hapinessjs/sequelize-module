import * as Sequelize from 'sequelize';
import { Options as SequelizeConfig } from 'sequelize';
import { Debugger } from '../shared';

const __debugger = new Debugger('SequelizeClientManager');

export class SequelizeClientManager {
    protected _config: SequelizeConfig;
    protected _client: Sequelize.Sequelize;

    constructor(options: SequelizeConfig) {
        __debugger.debug('constructor', '');

        this._config = options;

        if (!this._config || !Object.keys(this._config).length) {
            throw new Error('Missing sequelize configuration');
        }

        this._client = new Sequelize(this._config)
    }

    public get client(): Sequelize.Sequelize {
        return this._client;
    }
}
