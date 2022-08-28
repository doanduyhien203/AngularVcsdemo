import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  }, 
  {
    path: 'sign-in-rf',
    component: SignInRfComponent,
  }, 
  {
    path: 'register',
    component: RegisterComponent,
  }, 
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: "",
    redirectTo: 'sign-in-rf',
    pathMatch: "full"
  },
  
  {
    path: 'article',
    loadChildren: () =>
      import('./article/article.module').then((m) => m.ArticleModule),
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
