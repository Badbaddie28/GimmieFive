import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

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

  CategoryArray : String[] =['Tops','Pants','Dress','Jeans','Accessories','Shoes']

  
  constructor(private http: HttpClient,
    private router: Router,
    ){
    this.getAllProducts();

  }

  getAllProducts(){
    let category = "Tops";
    this.http.get(`http://localhost:5000/api/getproducts/${category}`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.ProductArray = resultData;
    })
  }


  thisCategory(category:String) {
    this.http.get(`http://localhost:5000/api/getproducts/${category}`)
      .subscribe((pantsData: any) => {
        console.log(pantsData);
        this.ProductArray = pantsData;
      }, error => {
        console.error(error);
      });
  }

  
  
  ascending() {
    this.http.get('http://localhost:5000/api/getproducts/price/ascending')
      .subscribe((ascending: any) => {
        console.log(ascending);
        this.ProductArray = ascending;
      }, error => {
        console.error(error);
      });
  }

  descending() {
    this.http.get('http://localhost:5000/api/getproducts/price/descending')
      .subscribe((ascending: any) => {
        console.log(ascending);
        this.ProductArray = ascending;
      }, error => {
        console.error(error);
      });
  }




  

}
