import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any; 

@Component({
  selector: 'app-product-list-edit',
  templateUrl: './product-list-edit.component.html',
  styleUrls: ['./product-list-edit.component.css']
})
export class ProductListEditComponent {
  form!:FormGroup
  productInfo: any[] = [];


  constructor( 
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    
    ) {
      
    }
    
  ngOnInit() {
    this.route.params.subscribe(params => {
      const _id = params['id'];
      this.getProduct(_id);
      
     
    });

    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      category: [''],
      price: [''],
      colors: [''],
      sizes: [''],
      designs: [''],
      image: [''],
      thumbnail: [''],
      stocks: [''],

    });

    
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

  getProduct(_id:string){
    this.http.get(`http://localhost:5000/api/product/${_id}`,)
    .subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.productInfo = [resultData];

        this.form.patchValue(
         resultData
        )
  })
}

  submit(){  
    const id = this.productInfo[0]._id;
   const product = this.form.getRawValue()

   if (typeof product.colors === 'string') {
    product.colors = product.colors.split(',').map((color: string) => color.trim());
  }

  if (typeof product.designs === 'string') {
    product.designs = product.designs.split(',').map((design: string) => design.trim());
  }

  if (typeof product.sizes === 'string') {
    product.sizes = product.sizes.split(',').map((size: string) => size.trim());
  }

  this.http.patch(`http://localhost:5000/api/product/${id}`, product)
  .subscribe(
    (response) => {
      // Handle success
      console.log('Update successful:', response);
      // You might want to navigate to another page or perform additional actions

      // Example: Navigate to the product list page after a successful update
      Swal.fire('Product updated successfuly')
      this.router.navigate(['/product-list']);
    
    },
    (error) => {
      // Handle errors
      console.error('Update failed:', error);


      // You might want to display an error message to the user or perform other actions
    }
  );


}
}
