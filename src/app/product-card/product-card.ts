import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toKHRPipe } from '../custom-pipe/to-khr-pipe';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, toKHRPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {
  readonly product = input<any>();
  private cartService = inject(CartService);
  addToCart(): void {
    this.cartService.addToCart(this.product());
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  cartItems(cartItems: any): any {
    throw new Error('Method not implemented.');
  }
}
