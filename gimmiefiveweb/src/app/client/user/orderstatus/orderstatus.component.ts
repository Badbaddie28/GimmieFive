import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.css']
})
export class OrderstatusComponent {
  OrderStatus: any[] = [];

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { 
      this.getOrderStatus();
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        const _id = params['id'];
       
      });
}

getOrderStatus(){
  this.http.get('http://localhost:5000/api/customer', {withCredentials : true})
  .subscribe(
    (customerData: any) => {
      console.log(customerData);

      let customerID = customerData._id;

      this.http.get(`http://localhost:5000/api/orderstatus/${customerID}`)
    .subscribe((resultData: any)=>
    {
      console.log(resultData);
      this.OrderStatus = resultData;
    })

  

      

})
}
}
