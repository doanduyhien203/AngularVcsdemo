import { Component } from '@angular/core';
import UserJson from './accounts.json' ;
   
interface USERS {
    account_number: number;
    balance : number;
    firstname : string;
    lastname: string;
    age: number;
    gender: string;
    address:string;
    employer:string;
    email:string;
    city:string;



}
 
@Component({
  selector: 'app-root',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
 
export class AccountComponent {

 
  Users: USERS[] = UserJson;
  constructor(){
    console.log(this.Users);
  }
 
}
