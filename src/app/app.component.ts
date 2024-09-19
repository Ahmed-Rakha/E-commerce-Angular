import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductsListComponent } from './products-list/recipes-list.component';
import { RouterOutlet } from '@angular/router';
import products from '../assets/data/products.json';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ProductsListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Shopify';

  constructor() {
    console.log(products.products);
    console.log(products.products.map((product) => product.stock));
  }
}
