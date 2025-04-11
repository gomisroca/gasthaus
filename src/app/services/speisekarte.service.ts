import { Injectable } from '@angular/core';
import data from '../../data.json';

@Injectable({
  providedIn: 'root',
})
export class SpeisekarteService {
  data = data;

  getData() {
    return this.data;
  }
}
