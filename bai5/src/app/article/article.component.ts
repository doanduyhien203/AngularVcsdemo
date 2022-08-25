import { Component } from '@angular/core';

@Component({
  selector: 'app-article',
  template: `
    <h3>Article Parent</h3>
    <router-outlet></router-outlet>
  `,
})
export class ArticleComponent {}
