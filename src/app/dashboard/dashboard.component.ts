import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  barChartOptions;

  barChartData: ChartData<'doughnut', { key: string; value: number }[]> = {
    datasets: [
      {
        data: [
          { key: 'Income', value: 50 },
          { key: 'Expanse', value: 50 },
        ],
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
