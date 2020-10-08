import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  List: any = ['1212', '34343', '4545'];

  vm: any = {
    id: "",
    name: "",
    brandCode: "",
    sub_groupCode: "",
    groupCode: "",
    mrp: "",
    sellingPrice: "",
    quantity: "",
    image: "",
    details: "",
    manufacturer: "",
  }


  AddPro: any = {
    name: "",
    brandCode: "",
    sub_groupCode: "",
    groupCode: "",
    mrp: "",
    sellingPrice: "",
    quantity: "",
    image: "",
    details: "",
    manufacturer: ""
  }

  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService, private http: HttpClient ,private router :Router) { }

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) notificationSort: MatSort;

  Columns = ['OrderID', 'SalerCode','Buyer', 'Date', 'Total', 'DeliveryStatus','PaymentStatus', 'Action'];
  productList: MatTableDataSource<DataType>;
  brandList;
  categoryList;
  subCategoryList;

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getSubGroups();
    this.getGroups()
  }

  addProducts(vm) {
    console.log(this.AddPro)
    this.spinner.show();
    let formData: FormData = new FormData();
    formData.append('name', this.AddPro.name);
    formData.append('brandCode', this.AddPro.brandCode);
    formData.append('sub_groupCode', this.AddPro.sub_groupCode);
    formData.append('groupCode', this.AddPro.groupCode);
    formData.append('mrp', this.AddPro.mrp);
    formData.append('sellingPrice', this.AddPro.sellingPrice);
    formData.append('quantity', this.AddPro.quantity);
    formData.append('image', this.AddPro.image);
    formData.append('details', this.AddPro.details);
    formData.append('manufacturer', this.AddPro.manufacturer);
    this.http.post(`${environment.providerDomain}/api/v1/product/`, formData).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getProducts();
        location.reload();
      } else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, err => {
      this.spinner.hide();
      let Error = err.error;
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    })
  }

  updateProducts(vm) {
    this.spinner.show();
    console.log(this.vm)
    this.http.put(`${environment.providerDomain}/api/v1/product/`, this.vm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getProducts();
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
        err.error.response,
        'error'
      )
      // this.notification.showNotification('error', err);
    })
  }

  getProducts() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/product/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.productList = new MatTableDataSource(res['response']);
        this.productList.paginator = this.notificationPaginator;
        this.productList.sort = this.notificationSort;
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

  getBrands() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/brand/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.brandList = res['response'];

      }else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, (err) => {
      let Error = err.error;
      this.spinner.hide();
      this.notification.showNotification('error', 'Something went wrong! please try after sometime.');
    });
  }

  getGroups() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/group/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.categoryList = res['response'];
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

  getSubGroups() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/group/subgroup/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.subCategoryList = res['response'];
      }else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, (err) => {
      this.spinner.hide();
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    });
  }

  deleteProducts(id) {
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
        this.httpCall.delete(`${environment.providerDomain}/api/v1/product/`, { body }).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'Product has been deleted.',
              'success'
            )
            this.getProducts();
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

  editProduct(element) {
    try {
      if (element != null) {
        this.vm.id = element.id;
        this.vm.name = element.name;
        this.vm.brandCode = element.brandCode;
        this.vm.sub_groupCode = element.sub_groupCode;
        this.vm.groupCode = element.groupCode;
        this.vm.mrp = element.mrp;
        this.vm.sellingPrice = element.sellingPrice;
        this.vm.quantity = element.quantity;
        this.vm.details = element.details;
        this.vm.manufacturer = element.manufacturer;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    }
  }

  applyFilter(filterValue: string) {
    this.productList.filter = filterValue.trim().toLowerCase();
  }

  navigateBack() {
    this.location.back();
  }

  RedirectUrl(id){
   this.router.navigate(['/vendor/quantity',id]);
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
            this.AddPro.image = selectedFile;
          } else {
            location.reload();
          }
        });
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

}


export interface DataType {
  
  OrderID: string,
  SalerCode: string,
  Buyer: string,
  Date: string,
  Total: string,
  DeliveryStatus: string,
  PaymentStatus: string,
}
