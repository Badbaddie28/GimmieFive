import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorHeaderComponent } from './visitor-header.component';

describe('VisitorHeaderComponent', () => {
  let component: VisitorHeaderComponent;
  let fixture: ComponentFixture<VisitorHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorHeaderComponent]
    });
    fixture = TestBed.createComponent(VisitorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
