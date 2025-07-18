import { HttpClient, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Injectable, makeEnvironmentProviders } from '@angular/core';
import { type Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { type SpeisekarteItem } from '@/types';

export interface NewSpeisekarteItem {
  name: string;
  description: string;
  price: number;
  categories: string[];
  tags: string[];
  seasonal: boolean;
  image: File;
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

  getCategory(category: string): Observable<SpeisekarteItem[]> {
    return this.http.get<SpeisekarteItem[]>(`${this.apiUrl}/speisekarte/?category=${category}`);
  }

  addItem(item: NewSpeisekarteItem): Observable<void> {
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('price', item.price.toString());

    item.categories.forEach((cat) => formData.append('categories', cat));
    item.tags.forEach((tag) => formData.append('tags', tag));

    formData.append('seasonal', item.seasonal.toString());
    formData.append('image', item.image);

    return this.http.post<void>(`${this.apiUrl}/speisekarte/`, formData, {
      withCredentials: true,
    });
  }

  updateItem(item: { id: string; currentImage: string } & NewSpeisekarteItem): Observable<void> {
    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('price', item.price.toString());

    item.categories.forEach((cat) => formData.append('categories', cat));
    item.tags.forEach((tag) => formData.append('tags', tag));

    formData.append('seasonal', item.seasonal.toString());
    formData.append('currentImage', item.currentImage);
    if (item.image instanceof File) {
      formData.append('image', item.image);
    }

    return this.http.put<void>(`${this.apiUrl}/speisekarte/${item.id}`, formData, {
      withCredentials: true,
    });
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/speisekarte/${id}`, {
      withCredentials: true,
    });
  }
}

export function provideSpeisekarteService(): EnvironmentProviders {
  return makeEnvironmentProviders([provideHttpClient(), SpeisekarteService]);
}
