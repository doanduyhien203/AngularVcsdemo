import { Component } from '@angular/core';
import { UserLogin } from './_models/userlogin';
import { UserLoginService } from './_service/userlogin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bai5';
  user: UserLogin;
  constructor(private loginService: UserLoginService) {
    this.loginService.user.subscribe(x => this.user = x);
}

logout() {
    this.loginService.logout();
}
}
