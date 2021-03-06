import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../common/product';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl= 'http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProduct> {
    
    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      +`&page=${thePage}&size=${thePageSize}`;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }



  getProductList(theCategoryId: number): Observable<Product[]> {
    
    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyworld: string):  Observable<Product[]> {

    const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyworld}`;

    return this.getProducts(searchUrl);    
  }

  searchProductsPaginate(thePage: number, 
                         thePageSize: number, 
                         theKeyworld: string): Observable<GetResponseProduct> {

    const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyworld}`
                      +`&page=${thePage}&size=${thePageSize}`;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory) 
    );
  }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

 interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
    }
 }

 interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
 }





















