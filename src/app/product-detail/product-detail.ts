import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { toKHRPipe } from '../custom-pipe/to-khr-pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, toKHRPipe, CurrencyPipe], // ✅ Fix for *ngIf
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail implements OnInit {
  product: any;
  loading: boolean | undefined;
  addToCart: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((data: any) => {
      this.product = data;
      this.loading = false;
    });
  }
}
// ngOnInit(): void {
//   const id = Number(this.route.snapshot.paramMap.get('id'));
//   if (id) {
//     this.loadProductDetail(id);
//   }
// }

// loadProductDetail(id: number): void {
//   this.productService.getProductById(id).subscribe({
//     next: (data: any) => {
//       this.product = data;
//     },
//     error: (err: any) => {
//       console.error('Error fetching product detail:', err);
//     },
//   });
// }
