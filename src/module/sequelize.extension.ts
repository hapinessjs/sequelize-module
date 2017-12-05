import {
    OnExtensionLoad, ExtensionWithConfig, Extension, CoreModule, extractMetadataByDecorator, DependencyInjection,
    OnModuleInstantiated
} from '@hapiness/core';
import { Observable } from 'rxjs';
import { SequelizeClientManager } from './managers';
import { Options as SequelizeConfig } from 'sequelize';

export class SequelizeClientExt implements OnExtensionLoad, OnModuleInstantiated {
    private _sequelizeClient: SequelizeClientManager;

    static setConfig(config: SequelizeConfig): ExtensionWithConfig {
        return {
            token: SequelizeClientExt,
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
                token: SequelizeClientExt,
                value: _
            }));
    }

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
        .flatMap(_ =>
            DependencyInjection
            .instantiateComponent(_, module.di)
            .map(instance => ({ instance, token: _ }))
        )
        .flatMap(instanceToken =>
            Observable
            .of(extractMetadataByDecorator<any>(instanceToken.token, 'TableModel'))
            .map(_ => this._sequelizeClient.client.define(_.name, _.model))
        )
        .toArray()
        .flatMap(_ =>
            Observable
            .from([].concat(module.modules).filter(__ => !!__))
            .flatMap(__ => this.addModels(__))
        );
    }
}
