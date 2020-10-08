import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  domain = environment.consumerDomain;
  currentYear = new Date().getFullYear();
  countryCode = "+1";
  @ViewChild('countryCode') public codeElement: ElementRef;
  user_exists: any;
  mobile_exist: any;

  onCodeChanged(changeEvent) {
    let codeValue = changeEvent.source.value;
    this.countryCode = codeValue;
  }
  vm = { fname: '', lname: '', email: '', mobile: '', countryCode: '', yob: null, password: '', confirmPassword: '', final_no: '' };

  years = [
    2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991,
    1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981,
    1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971,
    1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961,
    1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951,
    1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941,
    1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931,
    1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921
  ];

  constructor(private router: Router, private http: HttpClient, private notification: NotificationService) { }

  ngOnInit() {
  }

  check_user(event: any): void {
    let value = event.target.value;
    this.http.get(this.domain + '/BackEnd/get_user/' + value).subscribe(res => {
      this.user_exists = JSON.parse(JSON.stringify(res)).message;

    });
  }

  check_mobile(event: any): void {
    let value = event.target.value;
    this.http.get(this.domain + '/BackEnd/get_mobile/' + value).subscribe(res => {
      this.mobile_exist = JSON.parse(JSON.stringify(res)).message;

    });
  }

  onSubmit(vm) {
    let number = this.codeElement.nativeElement.textContent.concat(this.vm["mobile"]);
    this.vm['final_no'] = number;

    if (this.vm['age'] != null) {
      this.vm['yob'] = this.currentYear - this.vm['age'];
    }
    else if (this.vm["email"] == '' || this.vm['mobile'] == '' || this.vm["yob"] == null || this.vm["password"] == '') {
      this.notification.showNotification('error', 'Please Enter All Fields');
    }
    else {
      this.http.post(this.domain + '/BackEnd/userSignup', this.vm).subscribe(res => {
        if (JSON.parse(JSON.stringify(res)).success) {
          const params = JSON.parse(JSON.stringify(res)).response;
          this.notification.showNotification('success', JSON.parse(JSON.stringify(res)).message);
          this.router.navigate(['/consumer/verify/' + params]);
        }
        else {
          this.notification.showNotification('error', JSON.parse(JSON.stringify(res)).message);
        }
      }, (err) => {
        this.notification.showNotification('error', err);
      });
    }
  }

}
