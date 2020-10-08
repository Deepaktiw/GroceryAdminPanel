import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from '@angular/common';
import { HttpCallService } from 'src/app/services/http-call.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {


  constructor(private httpCall: HttpCallService, private location: Location, private notification: NotificationService, private spinner: NgxSpinnerService, private http: HttpClient, public router: Router) { }

  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;
  @ViewChild(MatSort) notificationSort: MatSort;

  Columns = ['UserName', 'EmailID', 'MobileNo', 'Action'];
  userList: MatTableDataSource<DataType>;

  ngOnInit() {
    this.getUsers();
  }

  vm: any = {
    "email": "",
  }

  bm: any = {
    id: "",
    name: "",
    email: "",
    mobile: "",
    role: ""
  }

  getUsers() {
    this.spinner.show();
    this.httpCall.get(`${environment.providerDomain}/api/v1/user/`).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        this.userList = new MatTableDataSource(res['response']);
        this.userList.paginator = this.notificationPaginator;
        this.userList.sort = this.notificationSort;
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

  deleteUser(emailId) {
    this.spinner.show();
    var body = {
      "email": emailId
    }
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.httpCall.delete(`${environment.providerDomain}/api/v1/user/`, { body }).subscribe(res => {
          console.log(res);
          this.spinner.hide();
          if (res['code'] == 200) {
            this.notification.showNotification('success', res['message']);
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
            this.getUsers();
          }else if(res['code'] ==  204 ){
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

  editUser(element) {
    try {
      if (element != null) {
        this.bm.id = element.id;
        this.bm.name = element.name;
        this.bm.email = element.email;
        this.bm.mobile = element.mob_no;
        this.bm.role = element.role;
      } else {
        console.log("else");
      }
    } catch (err) {
      console.log(err);
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    }
  }

  updateUser(bm) {
    try {
      this.spinner.show();
      var body = {
        "id": this.bm.id,
        "email": this.bm.email,
        "mob_no": this.bm.mob_no,
        "name": this.bm.name,
      }
      Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!'
      }).then((result) => {
        if (result.value) {
          this.httpCall.put(`${environment.providerDomain}/api/v1/user/`, body).subscribe(res => {
            console.log(body);
            console.log(res);
            this.spinner.hide();
            if (res['code'] == 200) {
              this.notification.showNotification('success', res['message']);
              this.router.navigate(['/vendor/manageUser']);
              Swal.fire(
                'Edited!',
                'User record has been updated.',
                'success'
              )
              this.getUsers();
              location.reload();
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



    } catch (err) {
      console.log(err);
      this.notification.showNotification('error','Something went wrong! Please try after sometime.');
    }
  }

  applyFilter(filterValue: string) {
    this.userList.filter = filterValue.trim().toLowerCase();
  }

  navigateBack() {
    this.location.back();
  }
}

export interface DataType {
  UserName: string,
  EmailID: string,
  MobileNo: string,
}