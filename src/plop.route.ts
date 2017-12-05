import { Route, Request, OnGet, OnPost } from '@hapiness/core';
import { Observable } from 'rxjs';
// import { SequelizeClientService } from './module/services';
// import { PersonModel } from './person.model';

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
    // constructor(
    //     private service: SequelizeClientService
    // ) {}

    onGet(request: Request): Observable<any[]> {
    // onGet(request: Request): Observable<PersonModel[]> {
        // const person = new PersonModel();
        return Observable.of([]); /* Observable.fromPromise(PersonModel.findAll()); */
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
    // constructor(
    //     private service: SequelizeClientService
    // ) {}

    /**
     * Post handler
     * Generate keys
     * Return 204 response
     *
     * @param  {Request} request
     * @returns Observable
     */
    onPost(request: Request): Observable<any> {
    // onPost(request: Request): Observable<PersonModel> {
        // const newPerson = new PersonModel(request.payload)
        return Observable.of({});
            // .fromPromise(newPerson.save());
    }
}
