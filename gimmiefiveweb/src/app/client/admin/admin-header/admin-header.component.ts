import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(
    private http:HttpClient,
    private router: Router
    ) { 

    }



  logout() {
    this.http.post('http://localhost:5000/api/logout', null, { withCredentials: true }).subscribe(
      (response) => {
        // Handle the successful logout response here
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle any errors that occur during the logout process
      }
    );
  }
}
