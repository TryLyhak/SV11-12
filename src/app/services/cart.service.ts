import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  updateCart(cartItems: any[]) {
    throw new Error('Method not implemented.');
  }
  removeById(id: any): void {
    throw new Error('Method not implemented.');
  }
  private storageKey = 'myCart';

  // Reactive cart signal
  private cart = signal<any[]>(this.loadCart());

  constructor() {}

  // Load items from localStorage
  private loadCart(): any[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  // Save cart to localStorage and update signal
  private saveCart(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cart.set(items); // update reactive signal
  }

  // Observable cart items for components
  cartItems() {
    return this.cart(); // use in computed()
  }

  // Cart count
  getCartCount() {
    return this.cart().length;
  }

  // Add item
  addToCart(item: any) {
    const items = [...this.cart(), item];
    this.saveCart(items);
  }

  // Remove item
  removeFromCart(index: number) {
    const items = [...this.cart()];
    items.splice(index, 1);
    this.saveCart(items);
  }

  // Update quantity
  updateQuantity(index: number, quantity: number) {
    const items = [...this.cart()];
    if (items[index]) {
      items[index].quantity = quantity;
      this.saveCart(items);
    }
  }

  // Clear cart
  clearCart() {
    localStorage.removeItem(this.storageKey);
    this.cart.set([]);
  }
}
