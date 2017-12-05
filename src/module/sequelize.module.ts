import { HapinessModule } from '@hapiness/core';
import { SequelizeClientService } from './services';

@HapinessModule({
    version: '0.0.1',
    declarations: [],
    providers: [],
    exports: [ SequelizeClientService ]
})
export class SequelizeModule {
}
