import {
    OnExtensionLoad, ExtensionWithConfig, Extension, CoreModule, extractMetadataByDecorator,
    OnModuleInstantiated
} from '@hapiness/core';
import { Observable } from 'rxjs';
import { SequelizeClientManager } from './managers';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

export class SequelizeExt implements OnExtensionLoad, OnModuleInstantiated {
    private _sequelizeClient: SequelizeClientManager;

    /**
    * Set the config for Sequelize module.
    *
    * @static
    * @param  {SequelizeConfig} config
    * @returns ExtensionWithConfig
    */
    static setConfig(config: SequelizeConfig): ExtensionWithConfig {
        return {
            token: SequelizeExt,
            config
        }
    }

    /**
    * Initilization of the extension
    *
    * @param  {CoreModule} module
    * @param  {SequelizeConfig} config
    * @returns Observable<Extension>
    */
    onExtensionLoad(module: CoreModule, config: SequelizeConfig): Observable<Extension> {
        return Observable
        .of(config)
        .map(_ => {
            this._sequelizeClient = new SequelizeClientManager(_);
            return this._sequelizeClient;
        })
        .map(_ => ({
            instance: this,
            token: SequelizeExt,
            value: _
        }));
    }

    /**
    * Actions performed when the extention have been loaded
    * Load models
    *
    * @param  {CoreModule} module
    * @returns Observable<Extension>
    */
    onModuleInstantiated(module: CoreModule): Observable<void> {
        return this
        .addModels(module)
        .ignoreElements()
        .defaultIfEmpty(null);
    }

    private addModels(module: CoreModule): Observable<any> {
        return Observable
        .from([].concat(module.declarations))
        .filter(_ => !!extractMetadataByDecorator(_, 'TableModel'))
        .flatMap(token =>
            Observable
            .of(extractMetadataByDecorator<any>(token, 'TableModel'))
            .map(_ => _.model)
            .toArray()
            .do(_ => this._sequelizeClient.client.addModels(_))
        )
        .toArray()
        .flatMap(_ =>
            Observable
            .from([].concat(module.modules).filter(__ => !!__))
            .flatMap(__ => this.addModels(__))
        );
    }
}
