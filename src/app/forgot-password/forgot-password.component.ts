import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  domain = environment.consumerDomain;
  dm = {
    email: ''
  }
  popUp = false;

  constructor(private router: Router, private notification: NotificationService, private http: HttpClient) { }

  ngOnInit() {

  }

  // forgotPassword functinality
  forgotPassword(vm) {
    var body = {
      email: this.dm.email
    };
    this.http.post(this.domain + '/BackEnd/userExiststance', body).subscribe(res => {
      if (res['success']) {
        this.popUp = true;
        this.notification.showNotification('success', res['message']);
      }
      else {
        this.notification.showNotification('error', res['message']);
      }
    }, (err) => {
      this.notification.showNotification('error', err);
    });
  }

}
