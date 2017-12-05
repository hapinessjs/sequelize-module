import { Route, Request, OnGet, OnPost } from '@hapiness/core';
import { Observable } from 'rxjs';
import { SequelizeClientService } from './module/services/index';
import { PersonModel } from './person.model';

@Route({
    path: '/persons',
    method: 'get',
    config: {
        description: 'Route to generate public/private keys by products.',
        notes: 'You have to provide an consumer_id',
        tags: ['api', 'app-token']
    },
    providers: [ ]
})
export class GetRoute implements OnGet {
    constructor(
        private service: SequelizeClientService
    ) {}

    onGet(request: Request): Observable<any[]> {
        return Observable.fromPromise(this.service.instance.models.Person.all());
    }
}

@Route({
    path: '/persons',
    method: 'post',
    config: {
        description: 'Route to generate public/private keys by products.',
        notes: 'You have to provide an consumer_id',
        tags: ['api', 'app-token']
    },
    providers: [ ]
})
export class PostRoute implements OnPost {
    constructor(
        private service: SequelizeClientService
    ) {}

    /**
     * Post handler
     * Generate keys
     * Return 204 response
     *
     * @param  {Request} request
     * @returns Observable
     */
    onPost(request: Request): Observable<PersonModel> {
        return Observable
            .fromPromise(this.service.instance.models.Person.create(request.payload));
    }
}
