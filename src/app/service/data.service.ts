import { Injectable } from '@angular/core';
import { users } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: any[] = users;
  private counter: number = users.length;

  public Users(): any[] {
      return this.data;
  }

  public remove(product: any): void {
      const index = this.data.findIndex(({ UserID }) => UserID === product.UserID);
      this.data.splice(index, 1);
  }

  public save(user: any, isNew: boolean): void {
    if (isNew) {
          user.UserID = this.counter++;
          this.data.splice(0, 0, user);
      } else {
        const changedData = this.data.find(({ UserID }) => UserID === user.UserID)
          Object.assign(
              changedData,
              user
          );
      }
  }
}
