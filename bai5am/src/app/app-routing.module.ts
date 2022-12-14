import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChartComponent } from './chart/chart.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorDialogComponent } from './noti-dialog/error-dialog/error-dialog.component';
import { RegisterComponent } from './register/register.component';
import { AddEditComponent } from './users/add-edit.component';
import { ListComponent } from './users/list.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  
  {
    path: 'list/add',
    component: AddEditComponent,
  },
  { path: 'edit/:id', component: AddEditComponent },
  

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccountComponent,
      },
    ],
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
