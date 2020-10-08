import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  vm: any = {
      productCode: "",
      quantity: "",
      unit:"",
      id:"",
      savedAmount: "",
      actualAmount: "",
      finalAmount: ""
  }

  dm: any = {
    productCode: "",
    quantity: "",
    id:"",
    unit:"",
    savedAmount: "",
    actualAmount: "",
    finalAmount: ""
  }

  unitList = ['KG', 'G' ,'L', 'ML','UNIT']
  
  display = 'none'; //default Variable
  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService, private http: HttpClient,private activateRoute :ActivatedRoute) { }

  @ViewChild(MatPaginator) categoryPaginator: MatPaginator;
  @ViewChild(MatSort) categorySort: MatSort;
  Columns = ['productCode', 'quantity', 'savedAmount','actualAmount','finalAmount','Action'];
  categoryList: MatTableDataSource<DataType>;
  productList;

  ngOnInit() {
    this.getProductQuantity();
    this.getProducts();
  }

  addQuantity(dm) {
    this.spinner.show();
    this.dm.quantity =  this.dm.quantity + "" + this.dm.unit;
    this.http.post(`${environment.providerDomain}/api/v1/product/quantity/`, this.dm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getProductQuantity();
        location.reload();
      } else {
        this.notification.showNotification('error', res['message']);
      }
    }, err => {
      console.log("====================", err);
      this.spinner.hide();
      Swal.fire(
        'ERROR:',
        err.error.response,
        'error'
      )
      // this.notification.showNotification('error', err);
    })
  }

  getProductQuantity() {
   let productId =   this.activateRoute.snapshot.params['id'];
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/product/quantity/?productCode=`+productId).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.categoryList = new MatTableDataSource(res['response']);
        this.categoryList.paginator = this.categoryPaginator;
        this.categoryList.sort = this.categorySort;
      }else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, (err) => {
      this.spinner.hide();
      this.notification.showNotification('error', err);
    });
  }

  getProducts() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/product/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.productList = res['response'];
      }else if(res['code'] ==  204 ){
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


  updateQuantity(vm) {
    this.spinner.show();
    this.httpCall.put(`${environment.providerDomain}/api/v1/product/quantity/`, this.vm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        let message = res['response'];
        this.notification.showNotification('success', message['msg']);
        this.getProductQuantity();
        location.reload();
      }
      else {
        this.notification.showNotification('error', res['msg']);
      }
    }, err => {
      this.spinner.hide();
      Swal.fire(
        'ERROR:',
        err.error.response,
        'error'
      )
      // this.notification.showNotification('error', err);
    })
  }


  deleteQuantity(id) {
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
        this.httpCall.delete(`${environment.providerDomain}/api/v1/product/quantity/`, { body }).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'Quantity has been deleted.',
              'success'
            )
            this.getProductQuantity();
          } else {
            this.notification.showNotification('error', res['error']);
          }
        }, (err) => {
          let Error = err.error;
          this.spinner.hide();
          this.notification.showNotification('error', Error.error);
        });
      }
    })
  }

  editQuantity(element) {
    try {
      if (element != null) {
        this.vm.id =  element.id;
        this.vm.productCode = element.productCode;
        this.vm.quantity = element.quantity;
        this.vm.savedAmount = element.savedAmount;
        this.vm.actualAmount = element.actualAmount;
        this.vm.finalAmount = element.finalAmount;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error', err);
    }
  }

  applyFilter(filterValue: string) {
    this.categoryList.filter = filterValue.trim().toLowerCase();
  }

  uploadReport(input) {
    if (input.files[0] && input.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "Click yes to upload image",
          imageUrl: e.target['result'].toString(),
          imageHeight: 200,
          imageAlt: 'Your Product Image',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: environment.colors.customPrimary,
          cancelButtonColor: environment.colors.customDanger,
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.value) {
            this.spinner.show();
            const fd: FormData = new FormData();
            let selectedFile = <File>input.files[0];
            fd.set('file', selectedFile, selectedFile.name);
            let userType = 1;
            // this.vm.image = fd;
            this.dm.image = selectedFile;
          } else {
            location.reload();
          }
        });
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  navigateBack() {
    this.location.back();
  }
}

export interface DataType {
  productCode: string,
  quantity:string,
  savedAmount:string,
  actualAmount:string,
  finalAmount:string,
  Action:string
}
