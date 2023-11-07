import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) { 

    }

    ngOnInit(): void {

      this.form = this.formBuilder.group({
        
        firstName: "",
        lastName: "",
        email:"",
      password: "",
      contactNum: "",
        houseNo: "",
        street:"",
      baranggay: "",
      city: "",
      province: "",
        zip: "",
        cpassword:"",
  
      })
  
        
    }


    

    ValidateEmail = (email: any) => {
 
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
      if (email.match(validRegex)) {  
    
        return true;
    
      } else {
    
        return false;
    
      }
    
    }

    submit() {
      let customer = this.form.getRawValue()
      console.log(customer)
      if(customer.firstName == "" || customer.lastName == "" || customer.email == "" || customer.password == "" || customer.contactNum == "" || customer.houseNo == "" || customer.zip == "" || customer.street == ""){
        Swal.fire("Error", "Please fill up all the required fields.", "error")
      }
    else if(!this.ValidateEmail(customer.email)){
   
      Swal.fire('Error', 'Please enter a valid email address', 'error');
  
    } 
    else if(customer.password !== customer.cpassword){
   
      Swal.fire('Error', 'Password not match', 'error');
  
    } 
    else {
  
    this.http
      .post('http://localhost:5000/api/register', customer, {
        withCredentials: true,
        
      })
      .subscribe(
        () => {
          Swal.fire('Account Created')
          this.router.navigate(['login']);
          // Successful request, dispatch a custom event
          const successEvent = new Event('postRequestSuccess');
          document.dispatchEvent(successEvent);
        },
        
        (err) => {
          Swal.fire("Error", err.error.message, 'error');
        }
      );
  
    }
  }


  
}
