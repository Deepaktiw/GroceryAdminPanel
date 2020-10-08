
import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  vm: any = {
    id: "",
    bannerImage: "",

  }

  dm: any = {
    bannerImage: "",

  }
  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService, private http: HttpClient) { }

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) notificationSort: MatSort;

  Columns = ['No', 'ImageUrl', 'BannerImage', 'Action'];
  //bannerList: MatTableDataSource<DataType>;
  bannerList: MatTableDataSource<DataType>;

  ngOnInit() {
    this.getBanner();
  }

  addBanner(vm) {
    this.spinner.show();
    var formData: any = new FormData();
    formData.append("image", this.dm.bannerImage);
    this.http.post(`${environment.providerDomain}/api/v1/banner/`, formData).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getBanner();
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

  editBanner(element) {
    try {
      if (element != null) {
        this.vm.id = element.id;
        this.vm.bannerImage = element.bannerImage;
        // this.vm.storebranch = element.similar;
        // this.vm.category = element.category;
        // this.vm.Status = element.Status;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error', 'Something went wrong! Please try after sometime.');
    }
  }


  updateBanner(vm) {
    this.spinner.show();
    this.httpCall.put(`${environment.providerDomain}/api/v1/banner/`, this.vm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getBanner();
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

  getBanner() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/banner/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.bannerList = new MatTableDataSource(res['response']);
        this.bannerList.paginator = this.notificationPaginator;
        this.bannerList.sort = this.notificationSort;
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

  deletebanner(id) {
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
        this.httpCall.delete(`${environment.providerDomain}/api/v1/banner/`, { body }).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'Product has been deleted.',
              'success'
            )
            this.getBanner();
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
    this.bannerList.filter = filterValue.trim().toLowerCase();
  }

  navigateBack() {
    this.location.back();
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
          imageAlt: 'Add Bannner Image',
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
            this.dm.bannerImage = selectedFile;
          } else {
            location.reload();
          }
        });
      }
      reader.readAsDataURL(input.files[0]);
    } else {
      console.log("----167----");
    }
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


}


export interface DataType {
  BannerImage: string,
}