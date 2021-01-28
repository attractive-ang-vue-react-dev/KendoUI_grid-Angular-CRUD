import { Injectable } from '@angular/core';
import { products } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: any[] = products;
  private counter: number = products.length;

  public products(): any[] {
      return this.data;
  }

  public remove(product: any): void {
      const index = this.data.findIndex(({ UserID }) => UserID === product.UserID);
      this.data.splice(index, 1);
  }

  public save(product: any, isNew: boolean): void {
    if (isNew) {
          product.UserID = this.counter++;
          this.data.splice(0, 0, product);
      } else {
        const changedData = this.data.find(({ UserID }) => UserID === product.UserID)
          Object.assign(
              changedData,
              product
          );
      }
  }
}
