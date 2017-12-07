/**
* @see https://github.com/pana-cc/mocha-typescript
*/
import { test, suite } from 'mocha-typescript';

/**
* @see http://unitjs.com/
*/
import * as unit from 'unit.js';
// import * as Sequelize from 'sequelize';
import { /* Sequelize, */ Table, Column, Model } from 'sequelize-typescript';

// import { Model } from 'sequelize';

import { Hapiness, HapinessModule, Inject, OnStart, Server, HttpServerExt } from '@hapiness/core';
import {
    SequelizeExt, SequelizeModule, SequelizeClientService, TableModel
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
            SequelizeExt.setConfig({
                dialect: 'sqlite',
                storage: ':memory:',
                username: null,
                password: null,
                database: null
            })
        ]);
    }


    @test('- It should register Models')
    testSequelizeModel(done) {
        @TableModel()
        @Table
        class MyModel extends Model<MyModel> {
            @Column
            name: String;
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [ MyModel ],
            imports: [ SequelizeModule ]
        })
        class SequelizeModuleTest implements OnStart {

            constructor(private _sequelizeClientService: SequelizeClientService) {}

            onStart(): void {
                let model = this._sequelizeClientService.instance.model('MyModel');

                unit.value(model).isFunction();
                done();
            }
        }

        Hapiness.bootstrap(SequelizeModuleTest, [
            SequelizeExt.setConfig({
                dialect: 'sqlite',
                storage: ':memory:',
                username: null,
                password: null,
                database: null
            })
        ])
        .catch(err => {
            done(err);
        });
    }
}
