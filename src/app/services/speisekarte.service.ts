import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SpeisekarteItem } from '../../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeisekarteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getItems(): Observable<SpeisekarteItem[]> {
    return this.http.get<SpeisekarteItem[]>(`${this.apiUrl}/speisekarte/`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/speisekarte/categories`);
  }

  getCategory(category: string): Observable<SpeisekarteItem[]> {
    return this.http.get<SpeisekarteItem[]>(
      `${this.apiUrl}/speisekarte/?category=${category}`
    );
  }
}
