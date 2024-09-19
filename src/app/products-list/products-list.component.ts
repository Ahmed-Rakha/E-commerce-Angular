import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../types/product';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products!: Array<Product>;
  constructor(private productService: HttpServiceService) {}
  // productsList
  ngOnInit() {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data.products));
  }
  receiveFromChild(id: number) {
    console.log('FROM PARENT', id);
    this.products = this.products.filter(
      (product: Product) => product.id !== id
    );
  }
}
