/**
* @see https://github.com/pana-cc/mocha-typescript
*/
import { test, suite } from 'mocha-typescript';

/**
* @see http://unitjs.com/
*/
// import * as unit from 'unit.js';
import * as Sequelize from 'sequelize';
// import { Model } from 'sequelize';

import { Hapiness, HapinessModule, Inject, OnStart, Server, HttpServerExt } from '@hapiness/core';
import {
    SequelizeClientExt, SequelizeModule, SequelizeClientService, TableModel
} from '../../src/index';

@suite('- Integration test of SequelizeModule')
export class SequelizeModuleIntegrationTest {
    /**
    * Test if `SequelizeModule` is correctly integrated and has functions
    */
    @test('- Test if `SequelizeModule` is correctly integrated and has functions')
    testSequelizeModule(done) {
        @HapinessModule({
            version: '1.0.0',
            providers: [],
            imports: [SequelizeModule]
        })
        class SequelizeModuleTest implements OnStart {
            constructor(@Inject(HttpServerExt) private _httpServer: Server,
            private _sequelizeService: SequelizeClientService) {
            }

            onStart(): void {
                this
                ._sequelizeService
                .testConnection()
                .subscribe(
                    res => {
                        this
                        ._httpServer
                        .stop()
                        .then(__ => done())
                        .catch(err => done(err))
                    },
                    err => this
                    ._httpServer
                    .stop()
                    .then(__ => done(err))
                    .catch(e => done(e))
                );
            }
        }

        Hapiness.bootstrap(SequelizeModuleTest, [
            HttpServerExt.setConfig({ host: '0.0.0.0', port: 1234 }),
            SequelizeClientExt.setConfig({
                dialect: 'sqlite',
                storage: ':memory:'
            })
        ]);
    }


    @test('- It should register Models')
    testSequelizeModel(done) {
        @TableModel({
            name: 'MyModel',
            model: {
                name: Sequelize.STRING
            }
        })
        class MyModel { }

        @HapinessModule({
            version: '1.0.0',
            declarations: [ MyModel ],
            imports: [ SequelizeModule ]
        })
        class SequelizeModuleTest implements OnStart {

            constructor(private _sequelizeClientService: SequelizeClientService) {}

            onStart(): void {
                let model = this._sequelizeClientService.instance.model('MyModel');
                console.log(`model ===> `, model);

                // unit.object(model).isNot(undefined);
                // unit.function(model).hasName(Model.constructor.prototype);
                done();
            }
        }

        Hapiness.bootstrap(SequelizeModuleTest, [
            SequelizeClientExt.setConfig({
                dialect: 'sqlite',
                storage: ':memory:'
            })
        ])
        .catch(err => {
           done(err);
        });
    }
}
