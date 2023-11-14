import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  form!:FormGroup
  productInfo: any[] = [];

  orderTotal: number = 0;
  shippingFee: number = 30;
  
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
        firstName: "",
        lastName: "",
        email:"",
        contactNum: "",
        houseNo: "",
        street:"",
        baranggay: "",
        city: "",
        province: "",
        zip: "",
        note:"",
        modeOfPayment:"",
  
      });

    
    }

    calculateOrderTotal() {
      this.orderTotal =   this.orderTotal = this.productInfo[0].quantity * this.productInfo[0].price;

    }

  
  getProduct(_id:String){
    this.http.get(`http://localhost:5000/api/checkout/${_id}`,)
       .subscribe(
         (resultData: any) => {
           console.log(resultData);
           this.productInfo = [resultData];

           this.form.patchValue(
            resultData
           )
           
     })
   }

   placeOrder(){
    const id = this.productInfo[0]._id
    const _id = this.productInfo[0].productID
    const orderedQuantity = this.productInfo[0].quantity;


    this.http.get(`http://localhost:5000/api/product/${_id}`, {withCredentials : true})
    .subscribe(
      (stockData: any) => {
        const currentStock = stockData.stocks; 
       const stock = currentStock - orderedQuantity;

       const updateStock = {
        stocks: stock
       }

       this.http.patch(`http://localhost:5000/api/product/${_id}`, updateStock)
  .subscribe(
    (response) => {
      console.log('Update successful:', response);


      const update = {
        isCheckedOut: true,
        modeOfPayment: this.form.get('modeOfPayment')?.value,
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        email:this.form.get('email')?.value,
        contactNum: this.form.get('contactNum')?.value,
        houseNo: this.form.get('houseNo')?.value,
        street:this.form.get('street')?.value,
        baranggay: this.form.get('baranggay')?.value,
        city: this.form.get('city')?.value,
        province: this.form.get('province')?.value,
        zip: this.form.get('zip')?.value,
        note:this.form.get('note')?.value,
  
      };
      
      this.http.patch(`http://localhost:5000/api/orderForm/${id}`, update)
      .subscribe(
        (response) => {
          // Handle success
          console.log('Update successful:', response);

          this.router.navigate(['orderstatus']);

          
        },
        (error) => {
          console.error('Update failed:', error);
    
  
        }
      );
    
    }
    
  );
         
  
  })
  }

  }
