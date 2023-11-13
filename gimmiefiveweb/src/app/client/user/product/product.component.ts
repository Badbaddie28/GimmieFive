import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productInfo: any[] = [];
  product : any={};
  CustomerInfo: any[] = [];
  form: any;


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

        this.form = this.formBuilder.group({
          customerID: "",
          productID: "",
          size:null,
          color: null,
          design: null,
          stocks: "",
          quantity: "",
          description: "",
          category: "",
          price: "",
          total: "",
          firstName: "",
          lastName: "",
          contactNum: "",
          title: "",
          houseNo: "",
          street:"",
          baranggay: "",
          city: "",
          province: "",
            zip: "",
            note:null,
            modeOfPayment:null,
     })  
      });

}

getProduct(_id:string){
  this.http.get(`http://localhost:5000/api/product/${_id}`,)
  .subscribe(
    (resultData: any) => {
      console.log(resultData);
      this.productInfo = [resultData];
      this.product = resultData;
})
}

addToCart(_id: string){
  this.http.get('http://localhost:5000/api/customer', {withCredentials : true})
  .subscribe(
    (customerData: any) => {
      console.log(customerData);

      this.CustomerInfo = [customerData];

      const customerID = customerData._id;
      const productID = _id;
      const firstName = customerData.firstName;
      const lastName = customerData.lastName;
      const contactNum = customerData.contactNum;
      const houseNo = customerData.houseNo;
      const street = customerData.street;
      const baranggay = customerData.baranggay;
      const city = customerData.city;
      const province = customerData.province;
      const zip = customerData.zip;
      const total = this.product.price;
      const title = this.product.title;
      const category = this.product.category;
      const price = this.product.price;

    
      

    

      let orderForm = this.form.getRawValue();

      const oderFormData = {  
         customerID :customerID,
         productID :productID,
         firstName :firstName,
         lastName :lastName,
         contactNum :contactNum,
         houseNo :houseNo,
         street :street,
         baranggay :baranggay,
         city :city,
         province :province,
         zip :zip,
        size: orderForm.size,
        color: orderForm.color,
        design: orderForm.design,
       title :title,
     category :category,
     price :price,
        total:total,
        note : orderForm.note,
        modeOfPayment : orderForm.modeOfPayment,
  
      };   

      this.http
      .post('http://localhost:5000/api/orderForm', oderFormData, {
        withCredentials: true,
        
      })
      .subscribe(
        () => {
          Swal.fire('Product added to Cart!')
          .then(() => {
          
            window.location.reload();
          }); 

          // Successful request, dispatch a custom event
          const successEvent = new Event('postRequestSuccess');
          document.dispatchEvent(successEvent);
        },
        
        (err) => {
          Swal.fire("Error", err.error.message, 'error');
        }
      );

})
}



}
