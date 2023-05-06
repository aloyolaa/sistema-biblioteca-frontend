import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { EjemplarLibro } from '../core/model/ejemplar-libro.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EjemplarLibroService {
  private url = 'http://localhost:8080/api/v1/ejemplares-libros';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<EjemplarLibro[]> {
    return this.httpClient.get<EjemplarLibro[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<EjemplarLibro> {
    return this.httpClient.get<EjemplarLibro>(`${this.url}/getOne/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/ejemplares-libros']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(libroId: number, cantidad: number): Observable<boolean> {
    return this.httpClient
      .get<boolean>(`${this.url}/save/${libroId}/${cantidad}`)
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

  update(ejemplarLibro: EjemplarLibro): Observable<EjemplarLibro> {
    return this.httpClient
      .put<EjemplarLibro>(`${this.url}/update`, ejemplarLibro)
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

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/count`);
  }

  getAllByLibroAndEstado(
    codigo: string,
    cantidad: number
  ): Observable<EjemplarLibro[]> {
    return this.httpClient.get<EjemplarLibro[]>(
      `${this.url}/getAllByLibroAndEstado/${codigo}/${cantidad}`
    );
  }

  countByLibro(codigo: string): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/countByLibro/${codigo}`);
  }

  countByLibroAndEstado(codigo: string): Observable<number> {
    return this.httpClient.get<number>(
      `${this.url}/countByLibroAndEstado/${codigo}`
    );
  }

  pagination(page: number): Observable<any> {
    return this.httpClient.get(`${this.url}/pagination/${page}`).pipe(
      map((response: any) => {
        (response.content as EjemplarLibro[]).forEach((ejemplarLibro) => {
          return ejemplarLibro;
        });
        return response;
      })
    );
  }

  paginationByLibro(codigo: string, page: number): Observable<any> {
    return this.httpClient
      .get(`${this.url}/paginationByLibro/${codigo}/${page}`)
      .pipe(
        map((response: any) => {
          (response.content as EjemplarLibro[]).forEach((ejemplarLibro) => {
            return ejemplarLibro;
          });
          return response;
        })
      );
  }
}
