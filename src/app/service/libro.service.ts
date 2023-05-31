import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Libro } from '../core/model/libro.model';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private url = `${environment.api_url}/libros`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Libro> {
    return this.httpClient.get<Libro>(`${this.url}/getOne/${id}`).pipe(
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

  pagination(page: number, size: number): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient.get(`${this.url}/pagination`, { params }).pipe(
      map((response: any) => {
        (response.content as Libro[]).forEach((libro) => {
          return libro;
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

  paginationByTitulo(
    titulo: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByTitulo/${titulo}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
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

  paginationByCodigo(
    codigo: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByCodigo/${codigo}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
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

  paginationByArea(id: number, page: number, size: number): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByArea/${id}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
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

  paginationByCategoria(
    id: number,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByCategoria/${id}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
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

  paginationByEditorial(
    id: number,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByEditorial/${id}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
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

  paginationByAutor(id: number, page: number, size: number): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByAutor/${id}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as Libro[]).forEach((libro) => {
            return libro;
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

  exportAllToPdf(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(`${this.url}/export-all-pdf`, httpOptions);
  }

  exportAllToXls(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(`${this.url}/export-all-xls`, httpOptions);
  }

  exportByAreaToPdf(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-area-pdf/${id}`,
      httpOptions
    );
  }

  exportByAreaToXls(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-area-xls/${id}`,
      httpOptions
    );
  }

  exportByCategoriaToPdf(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-categoria-pdf/${id}`,
      httpOptions
    );
  }

  exportByCategoriaToXls(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-categoria-xls/${id}`,
      httpOptions
    );
  }

  exportByEditorialToPdf(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-editorial-pdf/${id}`,
      httpOptions
    );
  }

  exportByEditorialToXls(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-editorial-xls/${id}`,
      httpOptions
    );
  }

  exportByAutorToPdf(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-autor-pdf/${id}`,
      httpOptions
    );
  }

  exportByAutorToXls(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-autor-xls/${id}`,
      httpOptions
    );
  }
}
