import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load cached products from localStorage if available
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.productsSubject.next(JSON.parse(savedProducts));
    }
  }

  // Get all products (cached)
  getProducts(forceRefresh: boolean = false): Observable<any[]> {
    if (this.productsSubject.value.length > 0 && !forceRefresh) {
      return of(this.productsSubject.value);
    }

    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((data) => {
        this.productsSubject.next(data);
        localStorage.setItem('products', JSON.stringify(data));
      })
    );
  }

  // Get single product by ID
  getProductById(id: number): Observable<any> {
    const cachedProduct = this.productsSubject.value.find((p) => p.id === id);
    if (cachedProduct) {
      return of(cachedProduct);
    }
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
