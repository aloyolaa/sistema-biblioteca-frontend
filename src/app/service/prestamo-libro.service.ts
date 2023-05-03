import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PrestamoLibro } from '../core/model/prestamo-libro.model';

@Injectable({
  providedIn: 'root',
})
export class PrestamoLibroService {
  private url = 'http://localhost:8080/api/v1/prestamos-libros';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<PrestamoLibro[]> {
    return this.httpClient.get<PrestamoLibro[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<PrestamoLibro> {
    return this.httpClient.get<PrestamoLibro>(`${this.url}/getOne/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/prestamos-libros']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(prestamoLibro: PrestamoLibro): Observable<PrestamoLibro> {
    return this.httpClient
      .post<PrestamoLibro>(`${this.url}/save`, prestamoLibro)
      .pipe(
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

  close(prestamoLibro: PrestamoLibro): Observable<PrestamoLibro> {
    return this.httpClient
      .put<PrestamoLibro>(`${this.url}/close`, prestamoLibro)
      .pipe(
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
}
