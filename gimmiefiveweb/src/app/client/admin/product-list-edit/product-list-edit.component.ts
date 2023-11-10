import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-edit',
  templateUrl: './product-list-edit.component.html',
  styleUrls: ['./product-list-edit.component.css']
})
export class ProductListEditComponent {
  form!:FormGroup
  productInfo: any[] = [];


  constructor( private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    
    ) {
      
    }
    
  ngOnInit() {
    this.route.params.subscribe(params => {
      const _id = params['id'];
      this.getProduct(_id);
     
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

  submit(){}
}
