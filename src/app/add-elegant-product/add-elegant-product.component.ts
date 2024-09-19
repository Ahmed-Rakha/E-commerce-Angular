import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-elegant-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-elegant-product.component.html',
  styleUrl: './add-elegant-product.component.css',
})
export class AddElegantProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
    // this.productForm = new FormGroup({
    //   productName: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //   ]),
    //   description: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(20),
    //   ]),
    // });
  }

  get productName() {
    return this.productForm.get('productName');
  }

  get description() {
    return this.productForm.get('description');
  }
  onSubmit() {
    console.log(this.productForm);
  }
}
