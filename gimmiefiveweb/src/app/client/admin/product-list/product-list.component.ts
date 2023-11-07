import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  ProductArray  : any[] =[];
  title= "";
  description= "";
  category= "";
  price= "";
  colors= "";
  sizes= "";
  designs= "";
  image= "";
  thumbnail= "";
  stocks= "";


  constructor(private http: HttpClient){
    this.getAllMember();
  }

  getAllMember(){
    this.http.get("http://localhost:5000/api/getproducts")
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.ProductArray = resultData;
    })
  }

}
