import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-brand',
  templateUrl: './manage-brand.component.html',
  styleUrls: ['./manage-brand.component.css']
})
export class ManageBrandComponent implements OnInit {

  vm: any = {
    id: "",
    name: "",
    classification: "",
    similar: "",
    margin: "",
  }

  dm: any = {
    name: "",
    classification: "",
    similar: "",
    margin: "",
    image:""
  }
  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService,private http :HttpClient) { }

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) notificationSort: MatSort;

  Columns = ['Brandname','image', 'Classification', 'Margin', 'Status', 'Action'];
  brandList: MatTableDataSource<DataType>;

  ngOnInit() {
    this.getBrands();
  }

  addBrands(vm) {
    this.spinner.show();
    let formData: FormData = new FormData();
    formData.append('name', this.dm.name);
    formData.append('classification', this.dm.classification);
    formData.append('similar', this.dm.similar);
    formData.append('margin', this.dm.margin);
    formData.append('image', this.dm.image);
    this.http.post(`${environment.providerDomain}/api/v1/brand/`, formData).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getBrands();
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


  editBrand(element) {
    try {
      if (element != null) {
        this.vm.id = element.id;
        this.vm.name = element.name;
        this.vm.similar = element.similar;
        this.vm.classification = element.classification;
        this.vm.margin = element.margin;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error', 'Something went wrong! Please try after sometime.');
    }
  }


  updateBrands(vm) {
    this.spinner.show();
    this.httpCall.put(`${environment.providerDomain}/api/v1/brand/`, this.vm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getBrands();
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

  getBrands() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/brand/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.brandList = new MatTableDataSource(res['response']);
        this.brandList.paginator = this.notificationPaginator;
        this.brandList.sort = this.notificationSort;
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

  deletebrand(id) {
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
        this.httpCall.delete(`${environment.providerDomain}/api/v1/brand/`, { body }).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'Product has been deleted.',
              'success'
            )
            this.getBrands();
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



  applyFilter(filterValue: string) {
    this.brandList.filter = filterValue.trim().toLowerCase();
  }

  navigateBack() {
    this.location.back();
  }

  ImageInLarge(bannerImage) {
    Swal.fire({
      imageUrl: bannerImage,
      imageHeight: 200,
      reverseButtons: true,
      confirmButtonColor: environment.colors.customPrimary,
      confirmButtonText: 'Close'
    })
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
}

export interface DataType {
  Brandname: string,
  Classification: Number,
  Margin: Number,
  Status: string,
  Active: string,
}