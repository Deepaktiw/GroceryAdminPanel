import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  constructor(public http: HttpClient) { }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'authorization': token
    });
    let options = {
      headers: headers
    }
    return this.http.get(`http://localhost:8000/api/getUserDetails`, options);
  }

  getHeaders(url) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'authorization': token
    });
    let options = {
      headers: headers
    }
    return this.http.get(url, options);
  }

}
