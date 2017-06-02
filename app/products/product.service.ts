import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IProduct } from './Product';

@Injectable()
export class ProductService {

    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) {}

    getProducts(): Observable <IProduct[]> {
        return this._http.get(this._productUrl)
             .map((res: Response) => <IProduct[]>res.json())
             .do(data => console.log(JSON.stringify(data)))
             .catch(this.handleError);
    }

    getProduct(id: number): Observable <IProduct> {
        return this.getProducts()
                .map((product: IProduct[]) => product.find (p => p.productId == id))
                .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    } 
}