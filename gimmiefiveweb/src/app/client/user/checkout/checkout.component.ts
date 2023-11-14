import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  form!:FormGroup
  productInfo: any[] = [];

  orderTotal: number = 0;
  shippingFee: number = 30;
  paymentTotal: number = 0;
  
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { 

    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        const _id = params['id'];
        this.getProduct(_id);

       
      });

      this.form = this.formBuilder.group({
       quantity: 1,
       total: ''
  
      });

      this.form.get('quantity')?.valueChanges.subscribe(value => {
        this.calculateOrderTotal();
        this.calculatePaymentTotal();
      });
    
    }

    calculateOrderTotal() {
      const quantity = this.form.get('quantity')?.value || 0;
      // Assuming that checkoutItem.price is the price of the item
      this.orderTotal = quantity * this.productInfo[0].price;
    }

    calculatePaymentTotal() {
      this.paymentTotal = this.orderTotal + this.shippingFee;

      this.form.patchValue({ total: this.paymentTotal });

    }
  

checkout(_id:String){

  const product = this.form.getRawValue()

  this.http.patch(`http://localhost:5000/api/orderForm/${_id}`, product)
  .subscribe(
    (response) => {
      // Handle success
      console.log('Update successful:', response);
      // You might want to navigate to another page or perform additional actions     
    
    },
    (error) => {
      // Handle errors
      console.error('Update failed:', error);

    }
  );

  this.router.navigate(['payment', _id]);
}

getProduct(_id:String){
 this.http.get(`http://localhost:5000/api/checkout/${_id}`,)
    .subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.productInfo = [resultData];
        this.form.patchValue({ quantity: 1 });  
  })
}





}
