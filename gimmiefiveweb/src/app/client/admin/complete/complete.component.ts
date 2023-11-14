import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent {
  ProductArray  : any[] =[];
  constructor(private http: HttpClient,
    private router: Router,
    ){
    this.getAllProduct();
  }

  getAllProduct(){
    this.http.get("http://localhost:5000/api/pending")
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.ProductArray = resultData;
    })
  }

 
}
