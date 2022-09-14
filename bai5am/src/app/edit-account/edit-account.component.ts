import { Component, Injectable, OnInit } from '@angular/core';
import { AlertService } from '../_service/alert.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class EditAccountComponent implements OnInit {

  constructor(

    private alertService: AlertService) { }



  ngOnInit() {

  }


}