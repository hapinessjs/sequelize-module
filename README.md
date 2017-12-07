<img src="http://bit.ly/2mxmKKI" width="500" alt="Hapiness" />

<div style="margin-bottom:20px;">
    <div style="line-height:60px">
        <a href="https://travis-ci.org/hapinessjs/sequelize-module.svg?branch=master">
            <img src="https://travis-ci.org/hapinessjs/sequelize-module.svg?branch=master" alt="build" />
        </a>
        <a href="https://coveralls.io/github/hapinessjs/sequelize-module?branch=master">
            <img src="https://coveralls.io/repos/github/hapinessjs/sequelize-module/badge.svg?branch=master" alt="coveralls" />
        </a>
        <a href="https://david-dm.org/hapinessjs/sequelize-module">
            <img src="https://david-dm.org/hapinessjs/sequelize-module.svg" alt="dependencies" />
        </a>
        <a href="https://david-dm.org/hapinessjs/sequelize-module?type=dev">
            <img src="https://david-dm.org/hapinessjs/sequelize-module/dev-status.svg" alt="devDependencies" />
        </a>
    </div>
    <div>
        <a href="https://www.typescriptlang.org/docs/tutorial.html">
            <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
                align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
        </a>
        <a href="http://reactivex.io/rxjs">
            <img src="http://reactivex.io/assets/Rx_Logo_S.png"
                align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
        </a>
        <a href="http://hapijs.com">
            <img src="http://bit.ly/2lYPYPw"
                align="right" alt="Hapijs logo" width="75" style="border:none;" />
        </a>
    </div>
</div>

# sequelize-module

Sequelize-module is a wrapper of [sequelize](http://docs.sequelizejs.com/) and [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) for the Hapiness Framework.

## Table of contents
* [Using sequelize-module inside your Hapiness application](#using-sequelize-module-inside-your-hapiness-application)
    * [`yarn` or `npm` it in your `package.json`](#yarn-or-npm-it-in-your-packagejson)
    * [Installing peer dependencies](#installing-peer-dependencies)
    * [Importing `SequelizeModule` from the library](#importing-sequelizemodule-from-the-library)
* [Models](#models)
    * [Defining a model](#defining-a-model)
    * [Injecting a model](#injecting-a-model)
* [`SequelizeClientService` functions](#sequelizeclientservice-functions)
* [Mainteners](#maintainers)

## Using sequelize-module inside your Hapiness application

### `yarn` or `npm` it in your `package.json`
```bash
// Using NPM
$ npm install --save @hapiness/core @hapiness/sequelize rxjs

// Using Yarn
$ yarn add @hapiness/core @hapiness/sequelize rxjs
```

### Installing peer dependencies
According to `sequelize` documentation you will need to install at least one of these packages for sequelize-module to work:

```bash
# Using NPM
$ npm install --save pg@6 pg-hstore #pg@7 is currently not supported
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save tedious # MSSQL

# Using Yarn
$ yarn add pg pg-hstore
$ yarn add mysql2
$ yarn add sqlite3
$ yarn add tedious # MSSQL
```
```javascript
"dependencies": {
    "@hapiness/core": "^1.3.0",
    "@hapiness/sequelize": "^1.0.0",
    "rxjs": "^5.5.3",
    // + one of these
    "mysql2": "^1.5.1",
    "pg": "^6.4.2",
    "pg-hstore": "^2.3.2",
    "sqlite3": "^3.1.13",
    "tedious": "^2.1.5"
    //...
}
```

### Importing `SequelizeModule` from the library

This module provide an Hapiness extension for Sequelize.
To use it, simply register it during the ```bootstrap``` step of your project and provide the ```SequelizeExt``` with its config

```typescript
@HapinessModule({
    version: '1.0.0',
    providers: [],
    declarations: [],
    imports: [SequelizeModule]
})
class MyApp implements OnStart {
    constructor() {}
    onStart() {}
}

Hapiness
    .bootstrap(
        MyApp,
        [
            /* ... */
            SequelizeExt.setConfig(
                {
                    dialect: 'sqlite', // 'mysql'|'sqlite'|'postgres'|'mssql'
                    username: 'username',
                    password: 'password',
                    database: 'database',
                    storage: ':memory:' // Only for sqlite (path of the file or :memory:)
                    // ...
                }
            )
        ]
    )
    .catch(err => {
        /* ... */
    });
```

`SequelizeExt` needs an `Option` object so you can provide all the properties defined by [Sequelize](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor) with the minimum of the options below:
```typescript
interface Options {
    username: string;
    password: string;
    database: string;
    dialect: 'mysql'|'sqlite'|'postgres'|'mssql';
}
```

## Models

### Defining a model

Sequelize-module uses `sequelize-typescript` so you can define your models with classes in the form of [sequelize-typescript models](https://github.com/RobinBuschmann/sequelize-typescript#model-definition). **However**, for your Models to be integreted in your Hapiness application you need to decorate it with `@TableModel`:

```Typescript
import { Model, Table } from 'sequelize-typescript';
import { TableModel } from '@hapiness/sequelize';

@TableModel()
@Table
export class User extends Model<User> { }
```

> **NB**: You need to either name your model's file the name of your + `.ts` (here `user.ts`) or you need to export your model as default: `export default class User extends...`

### Injecting a model

To Inject a Model in your application you just need to pass it to the array of `declarations` of your @`HapinessModule`.

> See examples directory for a basic working implementation. Run it with the command `npm run dev:watch`.

## ```SequelizeClientService``` functions

To use sequelize, you need to inject inside your providers the ```SequelizeClientService```.

```typescript
class FooProvider {

    constructor(private _sequelize: SequelizeClientService) {}

    bar(): Observable<string> {
    	return this._sequelize.instance.model('MyModel');
    }
}
```

`SequelizeClientService.instance` this will return you the sequelize client and you will be able to call on it every sequelize commands (see the reference [here](http://docs.sequelizejs.com/identifiers.html))

[Back to top](#table-of-contents)

## Maintainers

<table>
    <tr>
        <td colspan="5" align="center"><a href="https://www.tadaweb.com"><img src="http://bit.ly/2xHQkTi" width="117" alt="tadaweb" /></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil"><img src="https://avatars3.githubusercontent.com/u/6546204?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/antoinegomez"><img src="https://avatars3.githubusercontent.com/u/997028?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/reptilbud"><img src="https://avatars3.githubusercontent.com/u/6841511?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/njl07"><img src="https://avatars3.githubusercontent.com/u/1673977?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/xmaIIoc"><img src="https://avatars2.githubusercontent.com/u/1898461?s=117&v=4" width="117"/></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil">Julien Fauville</a></td>
        <td align="center"><a href="https://github.com/antoinegomez">Antoine Gomez</a></td>
        <td align="center"><a href="https://github.com/reptilbud">Sébastien Ritz</a></td>
        <td align="center"><a href="https://github.com/njl07">Nicolas Jessel</a></td>
        <td align="center"><a href="https://github.com/xmaIIoc">Florent Bennani</a></td>
    </tr>
</table>

[Back to top](#table-of-contents)

## License

Copyright (c) 2017 **Hapiness** Licensed under the [MIT license](https://github.com/hapinessjs/sequelize-module/blob/master/LICENSE.md).

[Back to top](#table-of-contents)
