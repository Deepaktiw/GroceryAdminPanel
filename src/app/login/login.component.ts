import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  vm: any = {
    email: "",
    password: ""
  }
  constructor(public http: HttpClient, public router: Router, private notification: NotificationService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  login(vm) {
    this.spinner.show();
    this.http.post(`${environment.providerDomain}/api/v1/user/login`, this.vm).subscribe(res => {
      this.spinner.hide();
      if (res['code'] == 200) {
        localStorage.clear();
        localStorage.setItem('token', res['response'].token);
        localStorage.setItem('email', res['response'].email);
        localStorage.setItem('id', res['response'].id);
        localStorage.setItem('name', res['response'].name);
        localStorage.setItem('role', '0');
        this.router.navigate(['/vendor/manage-dashboard']);
        } else if(res['code'] ==  204 ){
          this.spinner.hide();
          this.notification.showNotification('success', res['response']);
          this.router.navigate(['/']);
        } else {
          this.spinner.hide();
          this.notification.showNotification('success', res['message']);
          this.router.navigate(['/']);
        }
      
    }, (err) => {
      this.spinner.hide();
      let Error = err.error;
      this.notification.showNotification('error', 'Something went wrong! Please try after sometime.');
    });

  }

}
