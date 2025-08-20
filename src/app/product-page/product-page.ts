import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  imports: [ProductCard, RouterLink, RouterModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
  // products: any;
  // constructor(
  //   private route: ActivatedRoute,
  //   private productService: ProductService
  // ) {}

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.productService.getProductById(id).subscribe({
  //     next: (data) => {
  //       this.products = data;
  //     },
  //     error: (err) => {
  //       console.error('Error loading product:', err);
  //     },
  //   });
  // }
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }
}
