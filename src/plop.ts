import { Hapiness, OnError, OnStart, HapinessModule, HttpServerExt, Inject, Server } from '@hapiness/core';
import { SequelizeClientExt, SequelizeModule } from './module';
import { PersonModel } from './person.model';
import { GetRoute, PostRoute } from './plop.route';
import { SequelizeClientService } from './module/services';

@HapinessModule({
    version: '42.4.2',
    imports: [ SequelizeModule ],
    declarations: [ PersonModel, GetRoute, PostRoute],
    providers: [ SequelizeClientService ]
})
export class App implements OnError, OnStart {
    constructor( @Inject(HttpServerExt) private httpServer: Server/* , private sequlize: SequelizeClientService */) {
    }

    public onError(err) {
        console.error(`Error => `, err);
    }

    public onStart() {
        console.log(`started on ${this.httpServer.info.uri}`);
        // this.sequlize.connection.testConnection();
    }
}

Hapiness
.bootstrap(App, [
    SequelizeClientExt.setConfig({
        database: 'plop',
        dialect: 'sqlite',
        storage: './db.sqlite',
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
