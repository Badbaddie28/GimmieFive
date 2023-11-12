import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
cartArray: any[] = [];

  constructor( 
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    
    ) {
      this.getProduct();
    }

getProduct() {

  this.http.get('http://localhost:5000/api/customer',{withCredentials:true})
  .subscribe(
    (customerData: any) => {
      console.log(customerData);
      const customerID = customerData._id;
      this.http.get(`http://localhost:5000/api/cart/${customerID}`,{withCredentials:true})
    .subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.cartArray = resultData;
      },
      (error) => {
        console.error(error);
      }
    );

    },
    (error) => {
      console.error(error);
    }
  );
}

checkout(_id:String){
    this.router.navigate(['/checkout', _id]);
  
}



  

}
