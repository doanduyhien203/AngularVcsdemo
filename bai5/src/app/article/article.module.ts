import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleComponent } from './article.component';

const routes: Routes = [
  
      {
        path: '',
        component: ArticleListComponent,
      },
      {
        path: ':slug',
        component: ArticleDetailComponent,
      },
    ];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ArticleComponent,ArticleListComponent, ArticleDetailComponent],
})
export class ArticleModule {}