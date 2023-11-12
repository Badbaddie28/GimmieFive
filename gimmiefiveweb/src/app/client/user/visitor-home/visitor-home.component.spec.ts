import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorHomeComponent } from './visitor-home.component';

describe('VisitorHomeComponent', () => {
  let component: VisitorHomeComponent;
  let fixture: ComponentFixture<VisitorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorHomeComponent]
    });
    fixture = TestBed.createComponent(VisitorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
