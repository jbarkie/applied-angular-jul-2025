import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiLink } from '../types';
import { toSignal } from '@angular/core/rxjs-interop';

export class LinksApiService {
  private baseUrl = 'https://links-api.fictionalcompany.com/api/links';
  private http = inject(HttpClient);

  getLinks() {
    return this.http.get<ApiLink[]>(this.baseUrl);
  }

  getLinksAsSignal() {
    return toSignal(this.http.get<ApiLink[]>(this.baseUrl));
  }
}
