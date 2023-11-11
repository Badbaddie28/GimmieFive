import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/user/home/home.component';
import { LoginComponent } from './client/user/login/login.component';
import { ProductComponent } from './client/user/product/product.component';
import { RegisterComponent } from './client/user/register/register.component';
import { ShopComponent } from './client/user/shop/shop.component';
import { ContactusComponent } from './client/user/contactus/contactus.component';
import { ProfileComponent } from './client/user/profile/profile.component';
import { CartComponent } from './client/user/cart/cart.component';
import { CreateProductComponent } from './client/admin/create-product/create-product.component';
import { DashboardComponent } from './client/admin/dashboard/dashboard.component';
import { ProductListComponent } from './client/admin/product-list/product-list.component';
import { ProductListEditComponent} from './client/admin/product-list-edit/product-list-edit.component';
import { CompleteComponent } from './client/admin/complete/complete.component';
import { PendingComponent } from './client/admin/pending/pending.component';
import { CancelledComponent } from './client/admin/cancelled/cancelled.component';
import { OrderstatusComponent } from './client/user/orderstatus/orderstatus.component';
import { VisitorproductComponent } from './client/user/visitorproduct/visitorproduct.component';
import { CheckoutComponent } from './client/user/checkout/checkout.component';
import { PaymentComponent } from './client/user/payment/payment.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  {path:'home', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  { path: 'product/:id', component: ProductComponent },
  { path: 'visitor-product', component: VisitorproductComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'contacts', component: ContactusComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'cart', component: CartComponent},
  {path: 'create-product', component:CreateProductComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'product-list', component:ProductListComponent},
  {path: 'product-list-edit/:id', component:ProductListEditComponent},
  {path: 'complete', component:CompleteComponent},
  {path: 'pending', component:PendingComponent},
  {path: 'cancelled', component:CancelledComponent},
  {path: 'orderstatus', component:OrderstatusComponent},
  {path: 'visitor-product', component:VisitorproductComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path: 'payment', component:PaymentComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
  ]
})
export class AppRoutingModule { }
