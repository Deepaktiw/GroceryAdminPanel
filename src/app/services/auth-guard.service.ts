import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HttpCallService } from './http-call.service';

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class ProviderGuardService implements CanActivate {

  constructor( private router:Router, public service: HttpCallService ) { }

  canActivate() {
    if(localStorage.getItem('token') && (localStorage.getItem('role') == "0" || localStorage.getItem('role') == "1" || localStorage.getItem('role') =="2" || localStorage.getItem('role') =="3" || localStorage.getItem('role') =="4" )) {
      this.service.getProfile('api', environment.providerDomain).subscribe(res => {
        if(res['success']) {
          return true;
        }
        else {
          localStorage.clear();
          this.router.navigate(['/']);
          return false;
        }
      }, (err) => {
        localStorage.clear();
        this.router.navigate(['/']);
      });
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor( private router:Router, public service: HttpCallService ) { }
  
  canActivate() {
    if(localStorage.getItem('token')) {
      this.service.getProfile('admin', environment.superAdminDomain).subscribe(res => {
        if(res['success']) {
          return true;
        }
        else {
          localStorage.clear();
          this.router.navigate(['/Master/login']);
          return false;
        }
      }, (err) => {
        localStorage.clear();
        this.router.navigate(['/Master/login']);
      });
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(['/Master/login']);
      return false;
    }
  }
}