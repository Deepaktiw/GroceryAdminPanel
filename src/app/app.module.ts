import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule,
  MatPaginator,
  MatPaginatorModule,
} from '@angular/material';


import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiseService } from './services/auth-servise.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationService } from './services/notification.service';
import { ProviderGuardService, AdminGuardService } from './services/auth-guard.service';
import { HttpCallService } from './services/http-call.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GlobalDialogBoxComponent } from './global-dialog-box/global-dialog-box.component';

// Routes
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'registration',
    component: UserRegistrationComponent,
  },
  {
    path: 'vendor',
    loadChildren: './provider/provider.module#ProviderModule',
    data: { preload: true, delay: false },
  },
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    UserRegistrationComponent,
    LandingPageComponent,
    GlobalDialogBoxComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatListModule,
    RouterModule.forRoot(routes, { useHash: true }),


  ],
  providers: [AuthServiseService, NotificationService, ProviderGuardService, AdminGuardService, HttpCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
