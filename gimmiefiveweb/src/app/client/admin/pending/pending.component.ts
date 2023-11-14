import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})


export class PendingComponent {
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

  shipped(_id: string): void{
    const updatedData = { isDelivered: true };
    this.http.patch(`http://localhost:5000/api/orderForm/${_id}`, updatedData, { withCredentials: true })
      .subscribe((response: any) => {
        // Handle the response as needed, for example, update the UI or show a success message
        console.log('Application verified successfully:', response);
        // Optionally, you can reload the updated data after verification
        this.getAllProduct();
      }, (error) => {
        // Handle error if the PATCH request fails
        console.error('Error verifying application:', error);
      });

  }

  cancelled(_id: string): void{
    const updatedData = { isCancelled: true };
    this.http.patch(`http://localhost:5000/api/orderForm/${_id}`, updatedData, { withCredentials: true })
      .subscribe((response: any) => {
        // Handle the response as needed, for example, update the UI or show a success message
        console.log('Application verified successfully:', response);
        // Optionally, you can reload the updated data after verification
        this.getAllProduct();
      }, (error) => {
        // Handle error if the PATCH request fails
        console.error('Error verifying application:', error);
      });

  }

  
}
