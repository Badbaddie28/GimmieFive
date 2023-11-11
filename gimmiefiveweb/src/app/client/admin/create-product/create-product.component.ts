import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any; 

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  form!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
    ) { 

    }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        title: "",
        description: "",
        category: "",
        price: "",
        colors: null,
        sizes: null,
        designs: null,
        image: "",
        thumbnail: "",
        stocks: "",
   })

   this.loadScript('assets/js/uploadphoto.js').then(() => {
    // The JavaScript file is loaded and initialized
  }).catch(error => {
    console.error('Error loading org-reg.js', error);
  });
}

private loadScript(scriptUrl: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.type = 'text/javascript';
    scriptElement.onload = () => resolve(); // Change this line
    scriptElement.onerror = (error) => reject(error); // Change this line
    document.body.appendChild(scriptElement);
  });
}

onChange = ($event: Event, controlName: string) => {
  const target = $event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  this.convertfiletobase64(file, (base64String) => {
      // Set the base64 string to the appropriate form control
      if (controlName === 'image') {
          this.form.patchValue({ image: base64String });
      } 
      
      if (controlName === 'thumbnail') {
          this.form.patchValue({ thumbnail: base64String });
      }
  });
}

convertfiletobase64(file: File, callback: (base64string: string) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    let base64string = reader.result as string;

    callback(base64string);
  };
  reader.readAsDataURL(file);
}


  submit(){
    let product = this.form.getRawValue()

    if (product.colors) {
      product.colors = product.colors.split(',').map((colors: string) => colors.trim());
    }

    if (product.designs) {
      product.designs = product.designs.split(',').map((designs: string) => designs.trim());
    }

    if (product.sizes) {
      product.sizes = product.sizes.split(',').map((sizes: string) => sizes.trim());
    }

    this.http
      .post('http://localhost:5000/api/create', product, {
        withCredentials: true,
        
      })
      .subscribe(
        () => {
          Swal.fire('Product Created')
          this.router.navigate(['product-list']);
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
