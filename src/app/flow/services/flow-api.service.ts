import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestOptionsArgs, Http} from '@angular/http';
import {Flow} from '../interfaces/flow';

@Injectable()
export class FlowApiService {

  constructor(private http: Http) {
  }

  flows: Flow[] = <Flow[]>[
    {id: 1, name: 'Template 1', description: 'Description 1', createdOn: new Date(), modifiedOn: new Date()},
    {id: 2, name: 'Template 2', description: 'Description 2', createdOn: new Date(), modifiedOn: new Date()},
    {id: 3, name: 'Template 3', description: 'Description 3', createdOn: new Date(), modifiedOn: new Date()},
    {id: 4, name: 'Template 4', description: 'Description 4', createdOn: new Date(), modifiedOn: new Date()},
    {id: 5, name: 'Template 5', description: 'Description 5', createdOn: new Date(), modifiedOn: new Date()},
    {id: 6, name: 'Template 6', description: 'Description 6', createdOn: new Date(), modifiedOn: new Date()},
    {id: 7, name: 'Template 7', description: 'Description 7', createdOn: new Date(), modifiedOn: new Date()},
    {id: 8, name: 'Template 8', description: 'Description 8', createdOn: new Date(), modifiedOn: new Date()},
    {id: 9, name: 'Template 9', description: 'Description 9', createdOn: new Date(), modifiedOn: new Date()},
    {id: 10, name: 'Template 10', description: 'Description 10', createdOn: new Date(), modifiedOn: new Date()}
  ];

  getFlows(uuid: string = undefined): Observable<any[]> {
    const options: RequestOptionsArgs = {};
    if (!uuid) {
      return Observable.of(this.flows).map(o => o);
    } else {
      return this.http.get(``, options).map(res => res.json());
    }
  }

}
