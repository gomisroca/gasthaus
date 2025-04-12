import { Injectable } from '@angular/core';
import data from '../../data.json';

@Injectable({
  providedIn: 'root',
})
export class SpeisekarteService {
  data = data;

  getItems() {
    return this.data.items;
  }

  getCategories() {
    return this.data.categories;
  }

  getCategory(category: string) {
    return this.data.items.filter((item) => item.categories.includes(category));
  }
}
