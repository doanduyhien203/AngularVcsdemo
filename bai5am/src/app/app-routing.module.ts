import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';

const routes: Routes = [
  {
    path: 'sign-in-rf',
    component: SignInRfComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'home',
    component: HomeComponent,

    children: [
      {
        path: '',
        component: AccountComponent,
      },
    ],
  },

  {
    path: '',
    redirectTo: 'sign-in-rf',
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
