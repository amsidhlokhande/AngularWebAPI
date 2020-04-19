import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PersonService } from './service/person.service';

import { PersonDatabase } from './database/persondata';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule( {
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InMemoryWebApiModule.forRoot( PersonDatabase ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ PersonService ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
