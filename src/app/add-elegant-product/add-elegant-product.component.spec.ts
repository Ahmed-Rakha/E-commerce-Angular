import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElegantProductComponent } from './add-elegant-product.component';

describe('AddElegantProductComponent', () => {
  let component: AddElegantProductComponent;
  let fixture: ComponentFixture<AddElegantProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddElegantProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddElegantProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
