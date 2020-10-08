import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-discount',
  templateUrl: './manage-discount.component.html',
  styleUrls: ['./manage-discount.component.css']
})
export class ManageDiscountComponent implements OnInit {

  vm: any = {
    productCode: "",
    discount: "",
    id: ""
  }

  dm: any = {
    productCode: "",
    discount: "",
  }


  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService) { }

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) notificationSort: MatSort;

  Columns = ['productCode', 'discount', 'Action'];
  DiscountList: MatTableDataSource<DataType>;
  productList;

  ngOnInit() {
    this.getDiscount();
    this.getProducts();
  }

  addDiscounts(vm) {
    this.spinner.show();
    this.httpCall.postAuth(`${environment.providerDomain}/api/v1/discount/`, this.dm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getDiscount();
        location.reload();
      } else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, err => {
      this.spinner.hide();
      let Error = err.error;
      //  this.notification.showNotification('error', Error.error);
      Swal.fire(
        'ERROR:',
        'Something went wrong! Please try after sometime.',
        'error'
      )
      // this.notification.showNotification('error', err);
    })
  }

  editDiscount(element) {
    try {
      if (element != null) {
        this.vm.productCode = element.productCode;
        this.vm.discount = element.discount;
        this.vm.id = element.id;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    }
  }

  updateDiscount(vm) {
    this.spinner.show();
    this.httpCall.put(`${environment.providerDomain}/api/v1/discount/`, this.vm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getDiscount();
        location.reload();
      } else if(res['code'] ==  204 ){
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

  getDiscount() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/discount/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.DiscountList = new MatTableDataSource(res['response']);
        // console.log(this.DiscountList)
        this.DiscountList.paginator = this.notificationPaginator;
        this.DiscountList.sort = this.notificationSort;
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

  getProducts() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/product/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.productList = res['response'];
      } else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, (err) => {
      let Error = err.error;
      this.spinner.hide();
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    });
  }


  deleteDiscount(discountId) {
    this.spinner.show();
    var body = {
      "id": discountId
    }
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.httpCall.delete(`${environment.providerDomain}/api/v1/Discount/`, { body }).subscribe(res => {
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'Discount has been deleted.',
              'success'
            )
            this.getDiscount();
          } else if(res['code'] ==  204 ){
            this.notification.showNotification('success', res['response']);
          } else {
            this.notification.showNotification('success', res['message']);
          }
        }, (err) => {
          let Error = err.error;
          this.spinner.hide();
          this.notification.showNotification('error','Something went wrong! Please try after sometime.');
        });
      }
    })

  }

  applyFilter(filterValue: string) {
    this.DiscountList.filter = filterValue.trim().toLowerCase();
  }

  navigateBack() {
    this.location.back();
  }
}

export interface DataType {
  productCode: number,
  discount: Number,
  Active: string,
}