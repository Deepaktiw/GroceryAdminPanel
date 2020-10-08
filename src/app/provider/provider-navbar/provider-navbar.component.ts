import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-provider-navbar',
  templateUrl: './provider-navbar.component.html',
  styleUrls: ['./provider-navbar.component.css']
})
export class ProviderNavbarComponent implements OnInit {

  @Input() snav: any;

  firstName;
  isProLandingPage = false;

  constructor(private router: Router, public httpCall: HttpCallService) { 
    if(this.router.url.includes('/vendor/proLanding')) {
      this.isProLandingPage = true;
    } else {
      this.isProLandingPage = false;
    }
  }

  ngOnInit() {
    this.firstName = localStorage.getItem('fname');
    if(this.firstName) {
      localStorage.setItem("userExist","true");
    }
    else{
      localStorage.setItem("userExist","false");
    }
  }
  
  public localStorageItem() {
    this.firstName = localStorage.getItem('fname');
    return localStorage.getItem("userExist");
  }

  rightNavHieght;
  openRightNav() {
    this.rightNavHieght = '300px';
  }
  
  closeRightNav() {
    this.rightNavHieght = '0px';
  }

}
