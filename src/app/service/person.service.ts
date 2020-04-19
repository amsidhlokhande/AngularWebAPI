import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../database/persondata';
import { Observable } from 'rxjs/internal/Observable';
import { map, filter } from "rxjs/operators";

@Injectable()
export class PersonService {

  baseUrl: string = '/api/persons';

  constructor ( private httpClient: HttpClient ) {

  }

  getAllPersonDetails(): Observable<Person[]> {
    return this.httpClient.get<Person[]>( this.baseUrl );
  }

  savePerson( person: Person ): Observable<Person> {

    let headers = new HttpHeaders();
    headers.set( 'Content-Type', 'application/Json' );
    headers.set( 'Accept', 'application/Json' );

    let options = {
      headers: headers
    };
    return this.httpClient.post<Person>( this.baseUrl, person, options );
  }

  getPersonByPersonId( personId: number ): Observable<Person> {
    return this.httpClient.get<Person>( this.baseUrl + '/' + personId );
  }

  putPerson( person: Person ): Observable<void> {
    let headers = new HttpHeaders;
    headers.set( 'Content-Type', 'application/Json' );
    let options = {
      headers: headers
    }

    return this.httpClient.put<void>( this.baseUrl + '/' + person.id, person, options )
  }

  deletePerson( personId: number ): Observable<void> {
    return this.httpClient.delete<void>( this.baseUrl + '/' + personId );
  }
}
