import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  
  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) { 

    }
checkout(){
  this.router.navigate(['payment']);

}
}
