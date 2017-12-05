/**
* @see https://github.com/pana-cc/mocha-typescript
*/
import { test, suite } from 'mocha-typescript';

/**
* @see http://unitjs.com/
*/
import * as unit from 'unit.js';
import * as Sequelize from 'sequelize';

// import { Observable } from 'rxjs/Observable';
import { SequelizeClientManager } from '../../src';
// import { mockSquelizerAuthenticate } from '../mocks';

@suite('- Unit SequelizeClientManagerTest file')
export class SequelizeClientManagerTest {

    /**
    * Instantiate class without any config should throw an error
    */
    @test('- Instantiate class without any config should throw an error')
    testInstantiateWithoutConfigShouldThrow() {
        unit
        .assert
        .throws(
            () => new SequelizeClientManager(null),
            (err) => {
                if (err.message === 'Missing sequelize configuration') {
                    return true;
                }
                return false;
            }
        )
    }

    /**
    * Instantiate class with an empty config should throw an error
    */
    @test('- Instantiate class with an empty config should throw an error')
    testInstantiateWithEmptyConfigShouldThrow() {
        unit
        .assert
        .throws(
            () => new SequelizeClientManager({}),
            (err) => {
                if (err.message === 'Missing sequelize configuration') {
                    return true;
                }
                return false;
            }
        )
    }

    /**
    * Instantiate class with a sqlite dialect
    */
    @test('- Instantiate class with a sqlite dialect')
    testInstantiateWithSqlite() {
        const sequelizeClient = new SequelizeClientManager({dialect: 'sqlite', storage: 'memory'});

        unit.object(sequelizeClient.client).isInstanceOf(Sequelize);
    }
}
