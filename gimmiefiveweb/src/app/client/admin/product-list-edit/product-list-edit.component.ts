import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list-edit',
  templateUrl: './product-list-edit.component.html',
  styleUrls: ['./product-list-edit.component.css']
})
export class ProductListEditComponent {
  form!:FormGroup

  submit(){}
}
