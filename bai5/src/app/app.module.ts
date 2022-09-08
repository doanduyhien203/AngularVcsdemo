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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './account/sortable.directive';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ArticleModule } from './article/article.module';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ArticleModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    NgbModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignInRfComponent,
    RegisterComponent,
    AccountComponent,
    NgbdSortableHeader,
    AlertComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DecimalPipe],
})
export class AppModule { }
