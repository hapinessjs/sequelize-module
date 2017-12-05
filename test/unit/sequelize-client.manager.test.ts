/**
* @see https://github.com/pana-cc/mocha-typescript
*/
import { test, suite } from 'mocha-typescript';

/**
* @see http://unitjs.com/
*/
import * as unit from 'unit.js';
// import { Observable } from 'rxjs/Observable';
import { SequelizeClientManager } from '../../src';
// import { mockSquelizerAuthenticate } from '../mocks';

@suite('- Unit SequelizeAdapterTest file')
export class SequelizeAdapterTest {

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
            () => new SequelizeClientManager({} as any),
            (err) => {
                if (err.message === 'Missing sequelize configuration') {
                    return true;
                }
                return false;
            }
        )
    }

    /**
    * Instantiate class with a sqlite dialect but no sqliteStoragePath should throw an error
    */
    // @test('- Instantiate class with a sqlite dialect but no sqliteStoragePath should throw an error')
    // testInstantiateWithSqliteButNoSqliteStoragePathConfigShouldThrow() {
    //     unit
    //     .assert
    //     .throws(
    //         () => new SequelizeClientManager({ }),
    //         (err) => {
    //             if (err.message === 'Sqlite requires a sqliteStoragePath') {
    //                 return true;
    //             }
    //             return false;
    //         }
    //     )
    // }

    /**
    * Instantiate class with a sqlite dialect
    */
    // @test('- Instantiate class with a sqlite dialect')
    // testInstantiateWithSqlite() {
    //     const sequelizeAuthenticateStub = mockSquelizerAuthenticate();
    //     sequelizeAuthenticateStub.returns()
    //         const sequelize = new SequelizeClientManager({ dialect: 'sqlite', sqliteStoragePath: './plop.sqlite' });

    //         sequelize.testConnection().subscribe(() => {}, err => unit);
    // }
}
