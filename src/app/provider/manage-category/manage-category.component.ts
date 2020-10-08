import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  vm: any = {
    id: "",
    name: ""
  }

  dm: any = {
    name: "",
    image: ""
  }
  display = 'none'; //default Variable
  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService, private http: HttpClient) { }

  @ViewChild(MatPaginator) categoryPaginator: MatPaginator;
  @ViewChild(MatSort) categorySort: MatSort;

  Columns = ['Id','Image','categoryName', 'Action'];
  categoryList: MatTableDataSource<DataType>;

  ngOnInit() {
    this.getGroups();
  }

  addGroup(dm) {
    this.spinner.show();
    var formData: any = new FormData();
    formData.append("name", this.dm.name);
    formData.append("image", this.dm.image);
    this.http.post(`${environment.providerDomain}/api/v1/group/`, formData).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        this.notification.showNotification('success', res['response']);
        this.getGroups();
        location.reload();
      } else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, err => {
      console.log("====================", err);
      this.spinner.hide();
      Swal.fire(
        'ERROR:',
        'Something went wrong! Please try after sometime.',
        'error'
      )
      // this.notification.showNotification('error', err);
    })
  }

  getGroups() {
    this.spinner.show();
    this.httpCall.getAuth(`${environment.providerDomain}/api/v1/group/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.categoryList = new MatTableDataSource(res['response']);
        this.categoryList.paginator = this.categoryPaginator;
        this.categoryList.sort = this.categorySort;
      } else if(res['code'] ==  204 ){
        this.notification.showNotification('success', res['response']);
      } else {
        this.notification.showNotification('success', res['message']);
      }
    }, (err) => {
      this.spinner.hide();
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    });
  }


  updateGroup(vm) {
    this.spinner.show();
    this.httpCall.put(`${environment.providerDomain}/api/v1/group/`, this.vm).subscribe(res => {
      if (res['code'] == 200 || res['code'] == 201) {
        let message = res['response'];
        this.notification.showNotification('success', message['msg']);
        this.getGroups();
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


  deleteCategory(id) {
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
        this.httpCall.delete(`${environment.providerDomain}/api/v1/group/`, { body }).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'Group has been deleted.',
              'success'
            )
            this.getGroups();
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

  editCategory(element) {
    try {
      if (element != null) {
        this.vm.id = element.id;
        this.vm.name = element.name;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
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

  ImageInLarge(bannerImage) {
    Swal.fire({
      imageUrl: bannerImage,
      imageHeight: 200,
      reverseButtons: true,
      confirmButtonColor: environment.colors.customPrimary,
      confirmButtonText: 'Close'
    })
  }

  navigateBack() {
    this.location.back();
  }
}

export interface DataType {
  categoryName: string,
  Image: string
}