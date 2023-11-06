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


const routes: Routes = [
  { path: '', component: HomeComponent},
 {path: 'login', component: LoginComponent},
  { path: 'product', component: ProductComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'contacts', component: ContactusComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'cart', component: CartComponent},
  {path: 'create-product', component:CreateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
  ]
})
export class AppRoutingModule { }
