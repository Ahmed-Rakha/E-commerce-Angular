import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../types/product';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { MyCartServiceService } from '../my-cart-service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgFor],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productItem!: Product;
  @Output() sendToParent = new EventEmitter<number>();
  stars!: { total: number; fractions: number };
  constructor(
    private router: Router,
    private productService: HttpServiceService,
    private cartService: MyCartServiceService
  ) {}
  ngOnInit(): void {
    this.handleRating();
  }

  handleRating() {
    console.log('FROM CHILD', this.productItem.rating);
    this.stars = {
      total: Math.floor(this.productItem.rating),
      fractions: this.productItem.rating - Math.floor(this.productItem.rating),
    };
  }
  redirectToDetails(id: number) {
    this.router.navigate([`/product-details`, id]);
  }
  addToCart(id: number) {
    this.productService.getProductsById(id).subscribe((data) => {
      this.cartService.updateCart(data);
      console.log('data', data);
    });
  }
}
