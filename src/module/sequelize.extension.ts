import {
    OnExtensionLoad, ExtensionWithConfig, Extension, CoreModule, extractMetadataByDecorator,
    OnModuleInstantiated
} from '@hapiness/core';
import { Observable } from 'rxjs';
import { SequelizeClientManager } from './managers';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

export class SequelizeExt implements OnExtensionLoad, OnModuleInstantiated {

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
        .map(_ => new SequelizeClientManager(_))
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
    * @param  {SequelizeClientManager} manager
    * @returns Observable<Extension>
    */
    onModuleInstantiated(module: CoreModule, manager: SequelizeClientManager): Observable<void> {
        return this
        .addModels(module, manager)
        .ignoreElements()
        .defaultIfEmpty(null);
    }

    private addModels(module: CoreModule, manager: SequelizeClientManager): Observable<any> {
        return Observable
        .from([].concat(module.declarations))
        .filter(_ => !!extractMetadataByDecorator(_, 'TableModel'))
        .toArray()
        .do(_ => manager.client.addModels(_))
        .toArray()
        .flatMap(_ =>
            Observable
            .from([].concat(module.modules).filter(__ => !!__))
            .flatMap(__ => this.addModels(__, manager))
        );
    }
}
