import { Sequelize } from 'sequelize-typescript';
import { Debugger } from '../shared';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

const __debugger = new Debugger('SequelizeClientManager');

export class SequelizeClientManager {
    protected _config: SequelizeConfig;
    protected _client: Sequelize;

    constructor(options: SequelizeConfig) {
        __debugger.debug('constructor', '');

        this._config = options;

        if (!this._config || !Object.keys(this._config).length) {
            throw new Error('Missing sequelize configuration');
        }

        this._client = new Sequelize(this._config)
    }

    /**
    * Give you the Sequelize instance
    *
    * @returns Sequelize
    */
    public get client(): Sequelize {
        return this._client;
    }
}
