import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../core/model/autor.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private url = `${environment.api_url}/autores`;

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

  getAllByNombreAndApellido(value: string): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(
      `${this.url}/getAllByNombreAndApellido/${value}`
    );
  }

  pagination(page: number, size: number): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient.get(`${this.url}/pagination`, { params }).pipe(
      map((response: any) => {
        (response.content as Autor[]).forEach((autor) => {
          return autor;
        });
        return response;
      }),
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
}
