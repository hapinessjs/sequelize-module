import * as unit from 'unit.js';

import { test, suite } from 'mocha-typescript';

import * as Sequelize from 'sequelize';
import { SequelizeClientManager, SequelizeClientService } from '../../src/';

@suite('- Unit SequelizeClientServiceTest file')
export class SequelizeClientServiceTest {

    @test('- Create the service and get the instance')
    testServiceGetInstance() {
        const manager = new SequelizeClientManager({
            dialect: 'sqlite',
            storage: ':memory:',
            database: null,
            username: null,
            password: null
        });

        const service = new SequelizeClientService(manager);

        unit.object(service.instance).isInstanceOf(Sequelize);
    }
}
