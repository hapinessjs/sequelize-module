import { Route, Request, OnGet, OnPost } from '@hapiness/core';
import { Observable } from 'rxjs';
import { Person } from './models/person';

@Route({
    path: '/persons',
    method: 'get',
    config: {
        description: 'Route to retreive all persons',
        notes: null,
        tags: ['api', 'persons']
    },
    providers: [ ]
})
export class GetRoute implements OnGet {
    onGet(request: Request): Observable<any[]> {
        return Observable.fromPromise(Person.all());
    }
}

@Route({
    path: '/persons',
    method: 'post',
    config: {
        description: 'Route to create new person',
        notes: null,
        tags: ['api', 'person']
    },
    providers: [ ]
})
export class PostRoute implements OnPost {
    onPost(request: Request): Observable<Person> {
        return Observable
        .fromPromise(Person.create(request.payload));
    }
}
