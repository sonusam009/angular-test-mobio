import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './products';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private productsUrl = 'http://127.0.0.1:3000/products';
  
  constructor(private http: HttpClient) { }

  getProducts(param: number): Observable<Products[]> {
    let params = new HttpParams();
    params = params.append("_page", param);
    params = params.append("_limit", 15);
    return this.http.get<Products[]>(this.productsUrl, {params: params});
  }

  getProductsSort(param: string): Observable<Products[]> {
    let params = new HttpParams();
    params = params.append("_sort", param);
    return this.http.get<Products[]>(this.productsUrl, {params: params});
  }
}
