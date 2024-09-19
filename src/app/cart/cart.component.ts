import { Component, Input } from '@angular/core';
import { Product } from '../types/product';
import { NgFor, UpperCasePipe } from '@angular/common';
import { HttpServiceService } from '../http-service.service';
import { MyCartServiceService } from '../my-cart-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, UpperCasePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(
    private productService: HttpServiceService,
    private cartService: MyCartServiceService
  ) {}

  productDetails: any = [];

  ngOnInit() {
    this.cartService.getCart().subscribe((data: Product[]) => {
      const productMap = new Map<number, any>();

      data.forEach((item: Product) => {
        if (productMap.has(item.id)) {
          const existingProduct = productMap.get(item.id)!;
          existingProduct.count = (existingProduct.count ?? 0) + 1;
        } else {
          productMap.set(item.id, {
            ...item,
            count: 1,
            countMessage: '',
          });
        }
      });
      this.productDetails = Array.from(productMap.values());
    });
  }

  increment(productID: number) {
    console.log('hello from increment', productID);
    const product = this.productDetails.find(
      (product: Product) => product.id === productID
    );
    console.log('product', product);
    if (product.count === product.stock) {
      product.countMessage = 'Maximum reached';
      return;
    }
    if (product.count === 1) {
      product.countMessage = '';
    }
    product.count++;
  }

  decrement(productID: number) {
    const product = this.productDetails.find(
      (product: Product) => product.id === productID
    );
    if (product.count === 1) {
      product.countMessage = 'Minimum must be at least 1';
      return;
    }

    product.count--;
    if (product.count !== product.stock) {
      product.countMessage = '';
    }
  }
  getTotalPrice() {
    let total = 0;

    this.productDetails.forEach((product: Product) => {
      total += product.price * (product.count || 1);
    });
    return total.toFixed(2);
  }

  removeFromCart(productID: number) {
    this.productDetails = this.productDetails.filter(
      (product: Product) => product.id !== productID
    );

    this.cartService.removeProduct(productID);
  }
}
