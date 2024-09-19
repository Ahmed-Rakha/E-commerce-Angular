import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/recipes-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { not } from 'rxjs/internal/util/not';
import { CartComponent } from './cart/cart.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddElegantProductComponent } from './add-elegant-product/add-elegant-product.component';
import { CounterComponent } from './counter/counter.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    title: 'Shopify',
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    title: 'Add Product Page',
  },
  {
    path: 'add-elegant-product',
    component: AddElegantProductComponent,
    title: 'Add Product Page',
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Product Details Page',
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
  },
  // {
  //   path: 'cart/:id',
  //   component: CartComponent,
  //   title: 'Cart Page',
  // },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart Page',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found Page',
  },
];
