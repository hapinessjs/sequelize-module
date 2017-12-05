import { Hapiness, OnError, OnStart, HapinessModule, HttpServerExt, Inject, Server } from '@hapiness/core';
import { SequelizeClientExt, SequelizeModule } from './module';
import { PersonModel } from './person.model';
import { GetRoute, PostRoute } from './plop.route';
import { SequelizeClientService } from './module/services';
import * as Sequelize from 'sequelize';
import { Debugger } from './module/shared';

const __debugger = new Debugger('App');
@HapinessModule({
    version: '42.4.2',
    imports: [ SequelizeModule ],
    declarations: [ PersonModel, GetRoute, PostRoute],
    providers: [ ]
})
export class App implements OnError, OnStart {
    constructor( @Inject(HttpServerExt) private httpServer: Server, private sequlize: SequelizeClientService) {
    }

    public onError(err) {
        console.error(`Error => `, err);
    }

    public onStart() {
        console.log(`started on ${this.httpServer.info.uri}`);
        this.sequlize
        .testConnection()
        .subscribe(null,
            err => __debugger.debug('onStart', 'Test connection failed'),
            () => __debugger.debug('onStart', 'Test connection success')
        );

        this.sequlize.instance.getQueryInterface().createTable('People', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: Sequelize.STRING,
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
    SequelizeClientExt.setConfig({
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
