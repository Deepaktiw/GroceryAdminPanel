import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from "moment";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-date',
  templateUrl: './delivery-date.component.html',
  styleUrls: ['./delivery-date.component.css']
})
export class DeliveryDateComponent implements OnInit {
  vm: any = {
    id: "",
    name: ""
  }

  dm: any = {
    date: ""
  }
  display = 'none'; //default Variable
  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService) { }

  @ViewChild(MatPaginator) datePaginator: MatPaginator;
  @ViewChild(MatSort) dateSort: MatSort;

  Columns = ['No', 'Date', 'Action'];
  DeliveryDateList: MatTableDataSource<DataType>;

  ngOnInit() {
    this.getDeliveryDate();
  }

  addDeliverySlot(dm) {
    this.spinner.show();
    const dateFormat = "YYYY-MM-DD";
    this.dm.date = moment(this.dm.date).format(dateFormat);
    console.log(this.dm.date);
    this.httpCall.postAuth(`${environment.providerDomain}/api/v1/delivery/date/`, this.dm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getDeliveryDate();
        location.reload();
      }else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, err => {
      this.spinner.hide();
      Swal.fire(
        'ERROR:',
        'Something went wrong! Please try after sometime.',
        'error'
      )
      // this.notification.showNotification('error', err);
    })
  }

  getDeliveryDate() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/delivery/date/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.DeliveryDateList = new MatTableDataSource(res['response']);
        this.DeliveryDateList.paginator = this.datePaginator;
        this.DeliveryDateList.sort = this.dateSort;
      }else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, (err) => {
      this.spinner.hide();
      this.notification.showNotification('error', 'Something went wrong! Please try after sometime.');
    });
  }


  updateDeliverySlot(vm) {
    this.spinner.show();
    this.httpCall.put(`${environment.providerDomain}/api/v1/delivery/date/`, this.vm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        let message = res['response'];
        this.notification.showNotification('success', message['msg']);
        this.getDeliveryDate();
        location.reload();
      }else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, err => {
      this.spinner.hide();
      Swal.fire(
        'ERROR:',
        'Something went wrong! Please try after sometime.',
        'error'
      )
      // this.notification.showNotification('error', err);
    })
  }


  deleteDeliverySlot(id) {
    this.spinner.show();
    var body = {
      "id": id
    }
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.httpCall.delete(`${environment.providerDomain}/api/v1/delivery/date/`, { body }).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'Group has been deleted.',
              'success'
            )
            this.getDeliveryDate();
          } else if(res['code'] ==  204 ){
            this.notification.showNotification('success', res['response']);
          } else {
            this.notification.showNotification('success', res['message']);
          }
        }, (err) => {
          let Error = err.error;
          this.spinner.hide();
          this.notification.showNotification('error', 'Something went wrong! Please try after sometime.');
        });
      }
    })
  }

  editDeliverySlot(element) {
    try {
      if (element != null) {
        this.vm.id = element.id;
        this.vm.date = element.date;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    }
  }

  applyFilter(filterValue: string) {
    this.DeliveryDateList.filter = filterValue.trim().toLowerCase();
  }

  navigateBack() {
    this.location.back();
  }
}

export interface DataType {
  Date: string,
}
