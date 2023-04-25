import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../core/model/autor.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private url = 'http://localhost:8080/api/v1/autores';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Autor> {
    return this.httpClient.get<Autor>(`${this.url}/getOne/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/autores']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(autor: Autor): Observable<Autor> {
    return this.httpClient.post<Autor>(`${this.url}/save`, autor).pipe(
      catchError((e) => {
        if (e.error.status == 400) {
          return throwError(() => e);
        }
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  update(autor: Autor): Observable<Autor> {
    return this.httpClient.put<Autor>(`${this.url}/update`, autor).pipe(
      catchError((e) => {
        if (e.error.status == 400) {
          return throwError(() => e);
        }
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/delete/${id}`).pipe(
      catchError((e) => {
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/count`);
  }
}
