import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../_models/userlogin';
import { UserLoginService } from '../_service/userlogin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  user: UserLogin;

    constructor(private loginService: UserLoginService) {
        this.user = this.loginService.userValue;
    }
    logout() {
      this.loginService.logout();
  }
}
