import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorproductComponent } from './visitorproduct.component';

describe('VisitorproductComponent', () => {
  let component: VisitorproductComponent;
  let fixture: ComponentFixture<VisitorproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorproductComponent]
    });
    fixture = TestBed.createComponent(VisitorproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
