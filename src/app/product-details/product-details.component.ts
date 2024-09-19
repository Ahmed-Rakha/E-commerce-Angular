import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../types/product';
import productsStore from '../../assets/data/products.json';
import { NgFor, UpperCasePipe } from '@angular/common';
import { HttpServiceService } from '../http-service.service';
import { MyCartServiceService } from '../my-cart-service.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor, UpperCasePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  products: Array<Product> = productsStore.products;
  stars!: { total: number; fractions: number };
  moreInfoContent!: string;
  productDetails!: Product | any;
  count: number = 1;
  countMessage!: string;
  @Input() id!: number;

  constructor(
    private productService: HttpServiceService,
    private cartService: MyCartServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Capture the product ID from the route parameters
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.id = productId; // Assign it to your `id` input property

    // Fetch product details based on the product ID
    this.productService.getProductsById(this.id).subscribe(
      (data) => {
        this.productDetails = data;
        console.log('Product details:', this.productDetails);

        // Call handleRating after data is available
        this.handleRating();
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  handleRating() {
    if (this.productDetails && this.productDetails.rating) {
      this.stars = {
        total: Math.floor(this.productDetails.rating),
        fractions:
          this.productDetails.rating - Math.floor(this.productDetails.rating),
      };
    }
  }

  handleMoreInfo(type: string) {
    if (this.productDetails) {
      if (type === 'category') {
        this.moreInfoContent = this.productDetails.category;
      } else if (type === 'brand') {
        this.moreInfoContent = this.productDetails.brand;
      }
    }
  }

  decrement() {
    if (this.count === 1) {
      this.countMessage = 'Minimum must be at least 1';
      return;
    }
    this.count--;
    if (this.productDetails && this.count < this.productDetails.stock) {
      this.countMessage = '';
    }
  }

  increment() {
    if (this.productDetails && this.count === this.productDetails.stock) {
      this.countMessage = 'Maximum reached';
      return;
    }
    if (this.count === 1) {
      this.countMessage = '';
    }
    this.count++;
  }
  addToCart(id: number) {
    this.productService.getProductsById(id).subscribe((data) => {
      this.cartService.updateCart(data);
      console.log('data', data);
    });
  }
}
