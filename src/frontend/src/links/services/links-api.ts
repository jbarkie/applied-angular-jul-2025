import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiLink } from '../types';

export class LinksApiService {
  private baseUrl = 'https://links-api.fictionalcompany.com/api/links';
  private http = inject(HttpClient);

  getLinks() {
    return this.http.get<ApiLink[]>(this.baseUrl);
  }
}
