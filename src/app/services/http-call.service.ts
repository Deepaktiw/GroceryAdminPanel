import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpCallService {

  constructor(private http: HttpClient, private router: Router, private notification: NotificationService) { }

  getProfile(userType: String, domain: String): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': token
    });
    let options = {
      headers: headers
    }
    return this.http.get(`${domain}/${userType}/profile`, options);
  }

  isPatient(): boolean {
    if (localStorage.getItem('role') === "11") {
      return true;
    } else {
      return false;
    }
  }

  isSuperAdmin(): boolean {
    if (localStorage.getItem('role') === "0") {
      return true;
    } else {
      return false;
    }
  }

  isPrimaryContact(): boolean {
    if (localStorage.getItem('role') === "1") {
      return true;
    } else {
      return false;
    }
  }

  isPrimaryContactViewer(): boolean {
    if (localStorage.getItem('role') === "2") {
      return true;
    } else {
      return false;
    }
  }

  isDepartmentDirector(): boolean {
    if (localStorage.getItem('role') === "3") {
      return true;
    } else {
      return false;
    }
  }

  isDepartmentViewer(): boolean {
    if (localStorage.getItem('role') === "4") {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.clear();
    this.notification.showNotification("success", "Logged out successfully");
    this.router.navigate(['/']);
  }

  get(url) {
    return this.http.get(url);
  }

  post(url, body) {
    return this.http.post(url, body);
  }


  delete(url, body) {
    return this.http.delete(url, body);
  }

  put(url, body) {
    return this.http.put(url, body);
  }

  getAuth(url) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': token
    });
    let options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map(res => {
      if (res['sessionexp']) {
        localStorage.clear();
        this.router.navigate(['/consumer/userLogin']);
      } else {
        return res;
      }
    }));
  }

  postAuth(url, body) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': token
    });
    let options = {
      headers: headers
    };
    return this.http.post(url, body, options).pipe(map(res => {
      if (res['sessionexp']) {
        localStorage.clear();
        this.router.navigate(['/consumer/userLogin']);
      } else {
        return res;
      }
    }));
  }

  public sharingData;
  setDataSharing(data) {
    this.sharingData = data;
  }
  getDataSharing() {
    return this.sharingData;
  }

}