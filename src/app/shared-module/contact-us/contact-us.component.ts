import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
// Added by Harshith
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  domain = environment.consumerDomain;
  dataSet = [];
  raw_data = [];
  reasons = ["Account","Billing","Technical Support","Other"];
  vm:any = {
      fname:"",
      lname:"",
      email:"",
      reason:"",
      contact:"",
      desc:"",
      type: null
  };
  
  constructor(public http: HttpClient, private router: Router) {
    if(this.router.url.includes('/consumer')) {
      this.vm.type = 0;
    } else if(this.router.url.includes('/vendor')) {
      this.vm.type = 1;
    } else {
      // this.vm.type = 2;
    }
    console.log(this.vm.type)
   }

  ngOnInit() {
    this.get_FAQ();

    // +------------------------------------------------------------------------+ //
    // +----------------------- Start of Harshith's code -----------------------+ //
    // +------------------------------------------------------------------------+ //

    let route = this.router.url;
    this.isReadOnly = false;
    this.isMobileCodeReadOnly = false;

    if (route.includes('/vendor')) {
      this.providerUserTypeSelection = "selectedUserType";
      this.consumerUserTypeSelection = "";
    } else if (route.includes('/consumer')) {
      this.providerUserTypeSelection = "";
      this.consumerUserTypeSelection = "selectedUserType";
    }

    if (localStorage.getItem('userExist') && localStorage.getItem('userExist') == "true") {
      this.isReadOnly = true;
      this.vm.email = localStorage.getItem('userEmail');
      this.vm.fname = localStorage.getItem('fname');
      this.vm.lname = localStorage.getItem('lname');

      if ('mobile' in localStorage) {
        this.isMobileCodeReadOnly = true;
        if (localStorage.getItem('mobile').slice(0, 2) == "+1") {
          this.vm.countryCode = "+1";
        } else {
          this.vm.countryCode = "+91";
        }
        // Slice with -10 index returns the last 10 digits
        this.vm.contact = localStorage.getItem('mobile').slice(-10);
      }
    }

    // +------------------------------------------------------------------------+ //
    // +------------------------- End of Harshith's code -----------------------+ //
    // +------------------------------------------------------------------------+ //

  }
  
  get_FAQ(){
    this.http.get(`${this.domain}/BackEnd/FAQs`).subscribe(res=>{
      if(res["success"] ==true){
        this.raw_data = res["data"];
      
         this.dataSet = this.raw_data;        //  this.dataSet=this.raw_data.filter(item=>item.for=='consumer');
         
      }else{

        console.log("------No data Found------");
      }
    })
  }

  // Added by Harshith
  providerUserTypeSelection:any;
  consumerUserTypeSelection:any;
  isReadOnly: boolean;
  isMobileCodeReadOnly: boolean;

  provider_event(event: any) {
    if (event.target.checked == true) {
      this.dataSet = this.raw_data.filter(element => element.for == "provider");

      // Added by Harshith
      this.providerUserTypeSelection = "selectedUserType";
      this.consumerUserTypeSelection = "";
    } else {
      this.dataSet = this.raw_data.filter(item => item.for == 'consumer');

      // Added by Harshith
      this.providerUserTypeSelection = "";
      this.consumerUserTypeSelection = "selectedUserType";
    }
  }
  changeProType(event){
    this.vm.reason =event.source.value; 
  }
  onSubmit(vm){
  
    this.http.post(`${this.domain}/BackEnd/contactUs`,this.vm).subscribe(res=>{
      if (res['success']) {
        Swal.fire({
          type: 'success',
          title: this.vm.fname+'We appreciate your Interest! ',
          text: res['message'],
          confirmButtonColor: environment.colors.customPrimary
        });
      }
      else {
        Swal.fire({
          type: 'error',
          title: 'Sorry!',
          text: res['message'],
          confirmButtonColor: environment.colors.customPrimary
        });
      }
    })
  }

}
