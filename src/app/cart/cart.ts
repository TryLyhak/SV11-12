import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class cart implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  selectAllChecked: any;
  i: any;
  item: any;
  product: any;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartItems().map((item: any) => ({
      ...item,
      selected: false, // add checkbox state
    }));
    this.calculateTotal();
  }

  // removeItem(index: number) {
  //   this.cartService.removeFromCart(index);
  //   this.cartItems = this.cartService.cartItems();
  //   this.calculateTotal();
  // }

  removeItem(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(index);
        this.cartItems = this.cartService.cartItems();
        this.calculateTotal();

        Swal.fire('Removed!', 'The item has been removed.', 'success');
      }
    });
  }
  //  checkout

  checkout() {
    if (this.cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Your cart is empty!',
        text: 'Please add items to your cart before checking out.',
        confirmButtonText: 'OK',
      });
      return;
    }

    Swal.fire({
      title: 'Confirm Payment',
      html: `
      <p>Total Amount: <b>$${this.total.toFixed(2)}</b></p>
      <p>Do you want to proceed with payment?</p>
    `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Pay Now',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate payment success
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful! 🎉',
          text: 'Thank you for your purchase.',
          confirmButtonText: 'OK',
        }).then(() => {
          // this.cartItems.splice(index, 1);
          this.cartService.updateCart(this.cartItems);
          this.calculateTotal();
        });
      }
    });
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }

  calculateTotal() {
    this.total = this.cartItems
      .filter((item) => item.selected) // only selected items
      .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  toggleSelectAll() {
    this.cartItems.forEach((item) => (item.selected = this.selectAllChecked));
    this.calculateTotal();
  }

  onItemSelectionChange() {
    // if every item is selected, mark selectAll true
    this.selectAllChecked = this.cartItems.every((item) => item.selected);
    this.calculateTotal();
  }
}
