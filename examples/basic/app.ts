import { Hapiness, OnError, OnStart, HapinessModule, HttpServerExt, Inject, Server } from '@hapiness/core';
import { SequelizeExt, SequelizeModule } from '../../src/module';
import { Person } from './models/person';
import { GetRoute, PostRoute } from './app.route';
import { SequelizeClientService } from '../../src/module/services';
import { Sequelize } from 'sequelize-typescript';
import { Debugger } from '../../src/module/shared';

const __debugger = new Debugger('App');
@HapinessModule({
    version: '42.4.2',
    imports: [ SequelizeModule ],
    declarations: [ Person, GetRoute, PostRoute],
    providers: [ ]
})
export class App implements OnError, OnStart {
    constructor( @Inject(HttpServerExt) private httpServer: Server, private sequlize: SequelizeClientService) {
    }

    public onError(err) {
        __debugger.debug('onError', `Error => ${err}`);
    }

    public onStart() {
        __debugger.debug('onStart', `started on ${this.httpServer.info.uri}`);
        this.sequlize
        .testConnection()
        .subscribe(null,
            err => __debugger.debug('onStart', 'Test connection failed'),
            () => __debugger.debug('onStart', 'Test connection success')
        );

        this.sequlize.instance.getQueryInterface().createTable('Person', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: Sequelize.STRING,
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    }
}

Hapiness
.bootstrap(App, [
    SequelizeExt.setConfig({
        database: 'plop',
        dialect: 'sqlite',
        storage: ':memory:',
        username: null,
        password: null
    }),

    HttpServerExt
    .setConfig(
        {
            options: {
                connections: {
                    routes: {
                        cors: {
                            origin: ['*']
                        }
                    }
                }
            },
            host: 'localhost',
            port: 8888
        }
    ),
])
.catch(err => console.log(`Error: `, err));
