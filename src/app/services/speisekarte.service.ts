import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { type SpeisekarteItem } from '@/types';

export interface NewSpeisekarteItem {
  name: string;
  description: string;
  priceCents: number;
  categories: string[];
  tags: string[];
  seasonal: boolean;
  image: File;
}

export interface UpdateSpeisekarteItem extends NewSpeisekarteItem {
  id: string;
}

@Injectable()
export class SpeisekarteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUniqueItem(id: string): Observable<SpeisekarteItem> {
    return this.http.get<SpeisekarteItem>(`${this.apiUrl}/speisekarte/${id}`);
  }

  getItems(): Observable<SpeisekarteItem[]> {
    return this.http.get<SpeisekarteItem[]>(`${this.apiUrl}/speisekarte/`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/speisekarte/categories`);
  }

  getCategoryItems(category: string): Observable<SpeisekarteItem[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<SpeisekarteItem[]>(`${this.apiUrl}/speisekarte/`, { params });
  }

  addItem(item: NewSpeisekarteItem): Observable<void> {
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('price_cents', item.priceCents.toString());
    item.categories.forEach((cat) => formData.append('categories', cat));
    item.tags.forEach((tag) => formData.append('tags', tag));
    formData.append('seasonal', item.seasonal.toString());
    formData.append('image', item.image);

    return this.http.post<void>(`${this.apiUrl}/speisekarte/`, formData);
  }

  updateItem(item: UpdateSpeisekarteItem): Observable<void> {
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('price_cents', item.priceCents.toString());
    item.categories.forEach((cat) => formData.append('categories', cat));
    item.tags.forEach((tag) => formData.append('tags', tag));
    formData.append('seasonal', item.seasonal.toString());
    if (item.image instanceof File) {
      formData.append('image', item.image);
    }

    return this.http.put<void>(`${this.apiUrl}/speisekarte/${item.id}`, formData);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/speisekarte/${id}`);
  }
}
