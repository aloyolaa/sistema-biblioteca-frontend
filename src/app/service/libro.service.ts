import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Libro } from '../core/model/libro.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private url = 'http://localhost:8080/api/v1/libros';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${this.url}/`);
  }

  getOne(codigo: number): Observable<Libro> {
    return this.httpClient.get<Libro>(`${this.url}/getOne/${codigo}`).pipe(
      catchError((e) => {
        this.router.navigate(['/libros']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  getOneByCodigo(codigo: string): Observable<Libro> {
    return this.httpClient
      .get<Libro>(`${this.url}/getOneByCodigo/${codigo}`)
      .pipe(
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

  save(libro: Libro): Observable<Libro> {
    return this.httpClient.post<Libro>(`${this.url}/save`, libro).pipe(
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

  update(libro: Libro): Observable<Libro> {
    return this.httpClient.put<Libro>(`${this.url}/update`, libro).pipe(
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

  delete(codigo: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/delete/${codigo}`).pipe(
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

  getAllByTitulo(titulo: string): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${this.url}/getAllByTitulo/${titulo}`);
  }

  getAllByCodigo(codigo: string): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${this.url}/getAllByCodigo/${codigo}`);
  }

  paginationByArea(id: number, page: number): Observable<any> {
    return this.httpClient
      .get(`${this.url}/paginationByArea/${id}/${page}`)
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
          });
          return response;
        })
      );
  }

  paginationByCategoria(id: number, page: number): Observable<any> {
    return this.httpClient
      .get(`${this.url}/paginationByCategoria/${id}/${page}`)
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
          });
          return response;
        })
      );
  }

  paginationByEditorial(id: number, page: number): Observable<any> {
    return this.httpClient
      .get(`${this.url}/paginationByEditorial/${id}/${page}`)
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
          });
          return response;
        })
      );
  }

  paginationByAutor(id: number, page: number): Observable<any> {
    return this.httpClient
      .get(`${this.url}/paginationByAutor/${id}/${page}`)
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
          });
          return response;
        })
      );
  }
}
