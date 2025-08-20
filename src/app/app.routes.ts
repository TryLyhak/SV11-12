import { Routes } from '@angular/router';
import { cart } from './cart/cart';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { ProductCard } from './product-card/product-card';
import { ProductPage } from './product-page/product-page';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [
  {
    path: 'cart',
    component: cart,
  },
  {
    path: '',
    component: Home,
  },
  { path: 'contact', component: Contact },

  { path: 'product-page', component: ProductPage },
  { path: 'product/:id', component: ProductDetail },
];
