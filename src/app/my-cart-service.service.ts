import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './types/product';

@Injectable({
  providedIn: 'root',
})
export class MyCartServiceService {
  private product = new BehaviorSubject<Product[]>([]);

  constructor() {}

  // Get the current cart state
  getCart() {
    return this.product.asObservable();
  }

  // Add new product or update the cart
  updateCart(newProduct: Product) {
    const currentCart = this.product.getValue();
    const updatedCart = [...currentCart, newProduct];
    this.product.next(updatedCart);
  }

  // Remove product from the cart
  removeProduct(productID: number) {
    const currentCart = this.product.getValue();
    const updatedCart = currentCart.filter(
      (item: Product) => item.id !== productID
    );
    this.product.next(updatedCart);
  }
}
