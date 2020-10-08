import { Injectable } from '@angular/core';
import { RequestServiceService } from './request-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiseService {

  constructor(public service:RequestServiceService,public router:Router) { }
  canActivate() {
   if(localStorage.getItem('token')) {
     this.service.getProfile().subscribe(res => {
       if(res['success']) {
         return true;
       }
       else {
        console.log("Getting here boi",)

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
