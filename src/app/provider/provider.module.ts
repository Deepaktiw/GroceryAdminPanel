import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatGridListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatButtonToggleModule
} from '@angular/material';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProviderNavbarComponent } from './provider-navbar/provider-navbar.component';
import { ProSidebarComponent } from './pro-sidebar/pro-sidebar.component';
import { ProviderGuardService } from '../services/auth-guard.service';
import { AuthServiseService } from '../services/auth-servise.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { ManageDiscountComponent } from './manage-discount/manage-discount.component';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { ManageSubCategoryComponent } from './manage-sub-category/manage-sub-category.component';
import { ManageDashboardComponent } from './manage-dashboard/manage-dashboard.component';
import { DeliveryDateComponent } from './delivery-date/delivery-date.component';
import { DeliveryTimeComponent } from './delivery-time/delivery-time.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManagePaymentComponent } from './manage-payment/manage-payment.component';
import { ManageTransactionComponent } from './manage-transaction/manage-transaction.component';
import { BannersComponent } from './banners/banners.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ProductImageComponent } from './product-image/product-image.component';


const routes: Routes = [
  {
    path: '', component: ProSidebarComponent, children: [
      { path: '', redirectTo: 'manageProvider/:vendor', pathMatch: 'full' },
      //  { path: 'earnings', component: MyEarningsComponent, canActivate: [AuthServiseService] },
      { path: 'manageUser', component: ManageUsersComponent },
      { path: 'manage-product', component: ManageProductComponent },
      { path: 'manage-category', component: ManageCategoryComponent },
      { path: 'manage-sub-category', component: ManageSubCategoryComponent },
      { path: 'manage-brand', component: ManageBrandComponent },
      { path: 'manage-discount', component: ManageDiscountComponent },
      { path: 'manage-inventory', component: ManageInventoryComponent },
      { path: 'manage-dashboard', component: ManageDashboardComponent },
      { path: 'manage-deliverydate', component: DeliveryDateComponent },
      { path: 'manage-deliverytime', component: DeliveryTimeComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-payment', component: ManagePaymentComponent },
      { path: 'manage-transaction', component: ManageTransactionComponent },
      { path: 'Banners', component: BannersComponent },
      { path: 'product-image', component: ProductImageComponent },
      {path:'quantity/:id' ,component:ProductQuantityComponent}

    ]
  }

];

@NgModule({
  declarations: [
    ProviderNavbarComponent,
    ProSidebarComponent,
    ManageUsersComponent,
    ManageProductComponent,
    ManageCategoryComponent,
    ManageBrandComponent,
    ManageDiscountComponent,
    ManageInventoryComponent,
    ManageSubCategoryComponent,
    ManageDashboardComponent,
    DeliveryDateComponent,
    DeliveryTimeComponent,
    ManageOrdersComponent,
    ManagePaymentComponent,
    ManageTransactionComponent,
    BannersComponent,
    ProductQuantityComponent,
    ProductImageComponent
    ,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule,
    NgxSpinnerModule,
    AmazingTimePickerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatNativeDateModule

  ],
  exports: [RouterModule]
})
export class ProviderModule { }
