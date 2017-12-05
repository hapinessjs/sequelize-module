import {
    OnExtensionLoad, ExtensionWithConfig, Extension, CoreModule, extractMetadataByDecorator, DependencyInjection,
    OnModuleInstantiated
} from '@hapiness/core';
import { Observable } from 'rxjs';
import { SequelizeClientManager } from './managers';
import { Model } from 'sequelize-typescript';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

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
    * @param  {HapinessSequelizeConfig} config
    * @returns Observable<Extension>
    */
    onExtensionLoad(module: CoreModule, config: SequelizeConfig): Observable<Extension> {
        return Observable
            .of(() => {
                this._sequelizeClient = new SequelizeClientManager(config);
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
                    .instantiateComponent<Model<any>>(_, module.di)
                    .map(instance => ({ instance, token: _ }))
            )
            .flatMap(instanceToken =>
                Observable
                    .of(extractMetadataByDecorator<any>(instanceToken.token, 'TableModel'))
                    .toArray()
                    .map(_ => this._sequelizeClient.client.addModels(_))
            )
            .toArray()
            .flatMap(_ =>
                Observable
                    .from([].concat(module.modules).filter(__ => !!__))
                    .flatMap(__ => this.addModels(__))
            );
    }
}
