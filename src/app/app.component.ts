import { Component, OnInit } from '@angular/core';
import { Person } from './database/persondata';
import { PersonService } from './service/person.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent implements OnInit {
  title: string = 'Web API';
  personForm: FormGroup;
  formSubmitted: boolean = false;
  persons: Observable<Person[]>; //Creating object of Observable instead of actual object which was used in subscribe method.
  message: string;
  personIdToUpdate: number = null;
  constructor ( private formBuilder: FormBuilder, private personService: PersonService ) {
    this.personForm = this.formBuilder.group(
      {
        "id": new FormControl( '', [ Validators.required ] ),
        "name": new FormControl( '', [ Validators.required ] ),
        "email": new FormControl( '', Validators.compose( [ Validators.required, Validators.email ] ) ),
        "age": new FormControl( '', [ Validators.required ] ),
      }
    );

  }

  ngOnInit(): void {
    this.persons = this.getAllPersons();
    this.message = null
  }

  submitPersonForm() {
    this.formSubmitted = true;
    if ( this.personIdToUpdate == null ) {
      this.postPerson( this.personForm.value ).subscribe( person => console.log( JSON.stringify( person ) ) );
      this.message = "Form submitted successfully!!!";
      this.personIdToUpdate = null;
    } else {
      this.personForm.value.id = this.personIdToUpdate;
      this.putPerson();
    }
    this.personForm.reset();
    this.persons = this.personService.getAllPersonDetails();
  }

  resetForm() {
    this.formSubmitted = false;
    this.personForm.reset();
    this.personIdToUpdate == null
    this.message = null;
    this.persons = this.personService.getAllPersonDetails();
  }

  //Web API GET call
  getAllPersons(): Observable<Person[]> {
    return this.personService.getAllPersonDetails();
  }

  //Web API POST call
  postPerson( person: Person ): Observable<Person> {
    return this.personService.savePerson( person );
  }

  //Web API PUT call
  //First get the person by person id for which put operation will be apply
  getPersonByPersonId( personId: number ) {
    this.formSubmitted = false;
    this.personService.getPersonByPersonId( personId ).subscribe( person => {
      this.personIdToUpdate = person.id;
      this.personForm.setValue( {
        "id": person.id,
        "name": person.name,
        "email": person.email,
        "age": person.age
      } );
      this.message = 'Person with id ' + personId + ' fetched successfully!!';
    } );
  }
  //Now do the put operation
  putPerson() {
    this.personService.putPerson( this.personForm.value ).subscribe( personId => {
      this.message = 'Person with id ' + this.personIdToUpdate + ' submitted successfully!!!';
    } );

  }

  //Web API Delete method
  deletePersonByPersonId( personId: number ) {
    this.personService.deletePerson( personId ).subscribe( person => {
      console.log( 'Person with id ' + personId + ' deleted successfully!!' );
      this.message = 'Person with id ' + personId + ' deleted successfully!!';
    } );
    this.persons = this.personService.getAllPersonDetails();
  }


}
