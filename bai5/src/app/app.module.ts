import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
<<<<<<< HEAD
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './account/sortable.directive';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
=======
import { ArticleModule } from './article/article.module';

@NgModule({
  imports: [
    BrowserModule,
//    ArticleModule,
>>>>>>> da862393c18efc5dbac02312e5b33d09adcff4ef
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
<<<<<<< HEAD
    NgbModule,
    ReactiveFormsModule,

=======
  
>>>>>>> da862393c18efc5dbac02312e5b33d09adcff4ef
  ],

  declarations: [AppComponent, HomeComponent, SignInComponent, SignInRfComponent, RegisterComponent,AccountComponent, NgbdSortableHeader],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
