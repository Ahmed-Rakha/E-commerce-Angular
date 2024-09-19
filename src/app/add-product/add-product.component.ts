import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  formData = {
    productName: null,
    description: null,
  };
  onSubmit(productForm: any) {
    if (productForm.invalid) {
      Object.keys(productForm.controls).forEach((field) => {
        const control = productForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    console.log(productForm.value);
  }
}
