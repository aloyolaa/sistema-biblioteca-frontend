import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../core/model/area.model';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private url = 'http://localhost:8080/api/v1/areas';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Area[]> {
    return this.httpClient.get<Area[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Area> {
    return this.httpClient.get<Area>(`${this.url}/getOne/${id}`);
  }

  save(area: Area): Observable<Area> {
    return this.httpClient.post<Area>(`${this.url}/save`, area);
  }

  update(area: Area): Observable<Area> {
    return this.httpClient.put<Area>(`${this.url}/update`, area);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/delete/${id}`);
  }
}
