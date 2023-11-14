import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

  NewestArray  : any[]=[];

  CategoryArray : String[] =['Tops','Pants','Dress','Jeans','Accessories','Shoes']
  ColorArray : String[] = ['PURPLE','NAVY','YELLOW','BLACK','WHITE','GRAY', 'RED','BROWN','PINK','ORANGE','GREEN','BLUE']
  SizeArray : String[] = ['XXS','XS','S','M','L','XL', 'XXL','3XL','4XL']

  
  constructor(private http: HttpClient,
    private router: Router,
    ){
    this.getAllProducts();
    this.newest();

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
      .subscribe((categoryData: any) => {
        console.log(categoryData);
        this.ProductArray = categoryData;
      }, error => {
        console.error(error);
      });
  }

  thisColor(COLOR:String){
    console.log('Clicked color:', COLOR);
    this.http.get(`http://localhost:5000/api/getColor/${COLOR}`)
    .subscribe((colorData: any) => {
      console.log(colorData);
      this.ProductArray = colorData;
    }, error => {
      console.error(error);
    });
  }

  thisSize(SIZE:String){
    console.log('Clicked size:', SIZE);
    this.http.get(`http://localhost:5000/api/getSize/${SIZE}`)
    .subscribe((sizeData: any) => {
      console.log(sizeData);
      this.ProductArray = sizeData;
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

  newest(){
    this.http.get('http://localhost:5000/api/newest')
    .subscribe((newest: any) => {
      console.log(newest);
      this.NewestArray = newest;
    }, error => {
      console.error(error);
    }); 
}


  isAllSameCategory(): boolean {
   
    if (this.ProductArray.length > 0) {
      const firstCategory = this.ProductArray[0].category;

      return this.ProductArray.every(item => item.category === firstCategory);
    }

    // Return false if there is only one item or no items
    return false;
  }

}
