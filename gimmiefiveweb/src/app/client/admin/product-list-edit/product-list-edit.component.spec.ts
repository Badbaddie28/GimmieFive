import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListEditComponent } from './product-list-edit.component';

describe('ProductListEditComponent', () => {
  let component: ProductListEditComponent;
  let fixture: ComponentFixture<ProductListEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListEditComponent]
    });
    fixture = TestBed.createComponent(ProductListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
