import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productInfo: any[] = [];
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
          title: "",
          description: "",
          category: "",
          price: "",
          color: "",
          size: "",
          design: "",
          stocks: "",
     })  
      });

}
getProduct(_id:string){
  this.http.get(`http://localhost:5000/api/product/${_id}`,)
  .subscribe(
    (resultData: any) => {
      console.log(resultData);
      this.productInfo = [resultData];
})
}

submit(){
  this.http.get('http://localhost:5000/api/customer')
  .subscribe(
    (customerData: any) => {
      console.log(customerData);
      this.CustomerInfo = [customerData];
})


}

}
