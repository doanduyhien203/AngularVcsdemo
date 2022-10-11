import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { AlertComponent } from './alert/alert.component';
import { HighlightSearchPipe } from './account/highlightable-search.pipe';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import {
  AccountComponent,
  DataDialog,
  EditDialog,
 
} from './account/account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MatSelectModule } from '@angular/material/select';
import { AddEditComponent } from './users/add-edit.component';
import { ListComponent } from './users/list.component';
import {SuccessDialogComponent } from './noti-dialog/success-dialog/success-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { WarnDialogComponent } from './noti-dialog/warn-dialog/warn-dialog.component';
import { ErrorDialogComponent } from './noti-dialog/error-dialog/error-dialog.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatSortModule,

    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    DialogModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
  
    AppRoutingModule,

  ],

  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    AlertComponent,
    HighlightSearchPipe,
    LoginComponent,
    RegisterComponent,
    DataDialog,
    EditDialog,
    AddEditComponent,
    ListComponent,
    SuccessDialogComponent,
    WarnDialogComponent,
    ErrorDialogComponent,
    ChartComponent

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    DatePipe,
    {
      provide: MatDialogRef,
      useValue: {},
    }, 
  
  ],
})
export class AppModule {}
