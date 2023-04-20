import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../core/model/autor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private url = 'http://localhost:8080/api/v1/autores';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Autor> {
    return this.httpClient.get<Autor>(`${this.url}/getOne/${id}`);
  }

  save(autor: Autor): Observable<Autor> {
    return this.httpClient.post<Autor>(`${this.url}/save`, autor);
  }

  update(autor: Autor): Observable<Autor> {
    return this.httpClient.put<Autor>(`${this.url}/update`, autor);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/delete/${id}`);
  }
}
