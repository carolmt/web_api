import { HttpHeaders } from '@angular/common/http';

export function createHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
    'REST-API-KEY': 'TocToc',
  });
}
