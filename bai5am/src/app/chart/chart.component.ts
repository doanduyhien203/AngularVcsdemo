import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { USERS } from '../account/accounts';
import { User } from '../_models/account';

import { AccountService } from '../_service/account.service';

var arr = [3, 4, 12, 1, 0, 5, 22, 20, 44, 18, 30, 52];
arr = arr.sort(function (a, b) {
  return b - a;
});
arr = arr.slice(Math.min(arr.length, 0));

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public chart: Chart;
  

  constructor(private router: Router,) {
    Chart.register(...registerables);
  }
  click_avatar(){
    this.router.navigate(['/login'])
  };
  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            label: '# of Votes',
            data: arr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          ticks: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
