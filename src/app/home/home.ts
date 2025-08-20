import { Component } from '@angular/core';
import { Slider } from '../slider/slider';
import { ProductCard } from '../product-card/product-card';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  imports: [Slider, ProductCard, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products: any[] = [];
  loding: boolean | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.loding = false;
    });
  }
}

// ngOnInit(): void {
//   this.loadProducts();
// }

// loadProducts(): void {
//   this.productService.getProducts().subscribe({
//     next: (data) => {
//       this.products = data;
//     },
//     error: (err) => {
//       console.error('Error loading products:', err);
//     },
//   });
// }
