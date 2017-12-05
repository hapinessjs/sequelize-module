import { Observable } from 'rxjs/Observable';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

const debug = require('debug')('hapiness:sequelize-module');

class Debugger {
    private _className: string;

    constructor(classname) {
        this._className = classname;
    }

    private _debug(txt: string): void {
        debug(`${this._className}#${txt}`);
    }

    public debug(method: string, txt: string): void {
        this._debug(`${method} --> ${txt}`);
    }
}

const __debugger = new Debugger('SequelizeAdapter');

export class SequelizeClientManager {
    protected _config: SequelizeConfig;
    protected _client: Sequelize;

    constructor(options: SequelizeConfig) {
        __debugger.debug('constructor', 'plop')

        this._config = options;

        if (!this._config || !Object.keys(this._config).length) {
            throw new Error('Missing sequelize configuration');
        }

        this._client = null;

        this._client = new Sequelize(this._config)
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

    public get client(): Sequelize {
        return this._client;
    }
}
