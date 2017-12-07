import { HapinessModule } from '@hapiness/core';
import { SequelizeClientService } from './services';

@HapinessModule({
    version: '1.0.0',
    declarations: [],
    providers: [],
    exports: [ SequelizeClientService ]
})
export class SequelizeModule {
}
