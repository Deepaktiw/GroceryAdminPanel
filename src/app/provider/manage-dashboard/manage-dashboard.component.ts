import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-manage-dashboard',
  templateUrl: './manage-dashboard.component.html',
  styleUrls: ['./manage-dashboard.component.css']
})
export class ManageDashboardComponent implements OnInit {

  constructor() { }
  earningType = "";
  vm = {
    fromDate: '',
    toDate: ''
  }

  month_name = ['jan', 'feb', 'march', 'april', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  user_count = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  chart;


  bookingInfo = [
    { status: 0, color: "warning", infoMessage: "Your appointment is waiting for provider confirmation" },
    { status: 1, color: "primary", infoMessage: "Your appointment was booked" },
    { status: 2, color: "warning", infoMessage: "Your appointment was rescheduled by you and is Waiting for provider confirmation" },
    { status: 3, color: "warning", infoMessage: "Your appointment was rescheduled by provider, Please select another slot" },
    { status: 4, color: "danger", infoMessage: "Your appointment was cancelled" },
    { status: 5, color: "primary", infoMessage: "You paid for this appointment" },
    { status: 6, color: "primary", infoMessage: "This test/procedure was completed" },
    { status: 7, color: "warning", infoMessage: "This appointment was auto rescheduled" },
    { status: 8, color: "danger", infoMessage: "This appointment was auto cancelled" }
  ];

  ngOnInit() {
    this.showChart();
  }


  showChart() {
    this.chart = new Chart('lineCharts', {
      type: 'bar',
      data: {
        labels: this.month_name, // your labels array
        datasets: [
          {
            label: '# Total Revenue',
            data: this.user_count, // your data array
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(230, 25, 75, 1)',
              'rgba(60, 180, 75, 1)',
              'rgba(245, 130, 48, 1)',
              'rgba(145, 30, 180, 1)',
              'rgba(210, 245, 60, 1)',
              'rgba(0, 128, 128, 1)',
              'rgba(128, 0, 0, 1)'

            ],
            fill: true,
            lineTension: 0.2,
            borderWidth: 1
          }
        ]
      }
      ,
      options: {
        responsive: true,
        title: {
          text: "Monthly Users Graph",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}

