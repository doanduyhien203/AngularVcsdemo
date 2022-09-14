import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';
import { RegisterComponent } from './register/register.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { CommonModule, DecimalPipe } from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import { AlertComponent } from './alert/alert.component';
import { HighlightSearchPipe } from './account/highlightable-search.pipe';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { AccountComponent} from './account/account.component';
import { LoginComponent } from './login/login.component';
import { RegisUserComponent } from './regis-user/regis-user.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { EditAccountComponent } from './edit-account/edit-account.component';

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
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatSortModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    AppRoutingModule,

    
  ],

  declarations: [
    AppComponent,
    SignInRfComponent,
    RegisterComponent,
    HomeComponent,
    AccountComponent,
    AlertComponent,
    HighlightSearchPipe,
    LoginComponent,
    RegisUserComponent,
    EditAccountComponent
  ],
  bootstrap: [AppComponent],
  providers: [
 
  ],
  
})
export class AppModule {}
