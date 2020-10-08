import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlacesDirective } from '../services/google-places.directive';

import { 
  MatExpansionModule,
  MatTabsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule
 } from '@angular/material';
 import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { DateConversionPipe } from '../services/date-conversion.pipe';

const routes: Routes = [
  { path: 'contactUs', component: ContactUsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  declarations: [
    DateConversionPipe,
    GooglePlacesDirective,
    ContactUsComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  exports: [GooglePlacesDirective, DateConversionPipe ]
})
export class SharedModuleModule { }
