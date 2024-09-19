import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyCartServiceService } from '../my-cart-service.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  header_title: string;
  constructor(private cartService: MyCartServiceService) {
    console.log('CONST.');
    this.header_title = 'WEB APP';
  }
  cartCount: number = 0;
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
      this.cartCount = Array.from(productMap.values()).length;
    });
  }

  ngDoCheck() {
    // Trigger component changes
  }

  ngOnDestroy() {
    // Clean up Method
    // Clear interval / Remove localstorage keys
  }
}
