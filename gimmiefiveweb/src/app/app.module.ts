import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './client/user/home/home.component';
import { LoginComponent } from './client/user/login/login.component';
import { ProductComponent } from './client/user/product/product.component';
import { RegisterComponent } from './client/user/register/register.component';
import { ShopComponent } from './client/user/shop/shop.component';
import { ContactusComponent } from './client/user/contactus/contactus.component';
import { ProfileComponent } from './client/user/profile/profile.component';
import { CartComponent } from './client/user/cart/cart.component';
import { HeaderComponent } from './client/user/header/header.component';
import { CreateProductComponent } from './client/admin/create-product/create-product.component';
import { VariantProductComponent } from './client/admin/variant-product/variant-product.component';
import { InformationProductComponent } from './client/admin/information-product/information-product.component';
import { DashboardComponent } from './client/admin/dashboard/dashboard.component';
import { ProductListComponent } from './client/admin/product-list/product-list.component';
import { ProductListEditComponent } from './client/admin/product-list-edit/product-list-edit.component';
import { CompleteComponent } from './client/admin/complete/complete.component';
import { PendingComponent } from './client/admin/pending/pending.component';
import { CancelledComponent } from './client/admin/cancelled/cancelled.component';
import { OrderstatusComponent } from './client/user/orderstatus/orderstatus.component';
import { AdminHeaderComponent } from './client/admin/admin-header/admin-header.component';
import { VisitorproductComponent } from './client/user/visitorproduct/visitorproduct.component';
import { CheckoutComponent } from './client/user/checkout/checkout.component';
import { PaymentComponent } from './client/user/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    RegisterComponent,
    ShopComponent,
    ContactusComponent,
    ProfileComponent,
    CartComponent,
    HeaderComponent,
    CreateProductComponent,
    VariantProductComponent,
    InformationProductComponent,
    DashboardComponent,
    ProductListComponent,
    ProductListEditComponent,
    CompleteComponent,
    PendingComponent,
    CancelledComponent,
    OrderstatusComponent,
    AdminHeaderComponent,
    VisitorproductComponent,
    CheckoutComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
