import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.css']
})
export class CancelledComponent {
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
