import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PrestamoLibro } from '../core/model/prestamo-libro.model';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PrestamoLibroService {
  private url = `${environment.api_url}/prestamos-libros`;

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

  pagination(page: number, size: number): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient.get(`${this.url}/pagination`, { params }).pipe(
      map((response: any) => {
        (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
          return prestamoLibro;
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

  paginationByDocente(
    dni: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByDocente/${dni}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
            return prestamoLibro;
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

  paginationByGradoAndSeccion(
    grado: number,
    seccion: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByGradoAndSeccion/${grado}/${seccion}`, {
        params,
      })
      .pipe(
        map((response: any) => {
          (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
            return prestamoLibro;
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

  paginationByDescripcion(
    descripcion: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByDescripcion/${descripcion}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
            return prestamoLibro;
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

  paginationByFechaPrestamo(
    fechaPrestamoStartStr: string,
    fechaPrestamoEndStr: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    fechaPrestamoStartStr = formatDate(
      fechaPrestamoStartStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    fechaPrestamoEndStr = formatDate(
      fechaPrestamoEndStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    return this.httpClient
      .get(
        `${this.url}/paginationByFechaPrestamo/${fechaPrestamoStartStr}/${fechaPrestamoEndStr}`,
        { params }
      )
      .pipe(
        map((response: any) => {
          (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
            return prestamoLibro;
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

  paginationByFechaPrestamoAndDocente(
    fechaPrestamoStartStr: string,
    fechaPrestamoEndStr: string,
    docenteId: number,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    fechaPrestamoStartStr = formatDate(
      fechaPrestamoStartStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    fechaPrestamoEndStr = formatDate(
      fechaPrestamoEndStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    return this.httpClient
      .get(
        `${this.url}/paginationByFechaPrestamoAndDocente/${fechaPrestamoStartStr}/${fechaPrestamoEndStr}/${docenteId}`,
        { params }
      )
      .pipe(
        map((response: any) => {
          (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
            return prestamoLibro;
          });
          return response;
        })
      );
  }

  paginationByFechaPrestamoAndGradoAndSeccion(
    fechaPrestamoStartStr: string,
    fechaPrestamoEndStr: string,
    grado: number,
    seccion: string,
    page: number,
    size: number
  ): Observable<any> {
    fechaPrestamoStartStr = formatDate(
      fechaPrestamoStartStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    fechaPrestamoEndStr = formatDate(
      fechaPrestamoEndStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(
        `${this.url}/paginationByFechaPrestamoAndGradoAndSeccion/${fechaPrestamoStartStr}/${fechaPrestamoEndStr}/${grado}/${seccion}`,
        { params }
      )
      .pipe(
        map((response: any) => {
          (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
            return prestamoLibro;
          });
          return response;
        })
      );
  }

  paginationByFechaPrestamoAndDescripcion(
    fechaPrestamoStartStr: string,
    fechaPrestamoEndStr: string,
    descripcion: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    fechaPrestamoStartStr = formatDate(
      fechaPrestamoStartStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    fechaPrestamoEndStr = formatDate(
      fechaPrestamoEndStr,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );
    return this.httpClient
      .get(
        `${this.url}/paginationByFechaPrestamoAndDescripcion/${fechaPrestamoStartStr}/${fechaPrestamoEndStr}/${descripcion}`,
        { params }
      )
      .pipe(
        map((response: any) => {
          (response.content as PrestamoLibro[]).forEach((prestamoLibro) => {
            return prestamoLibro;
          });
          return response;
        })
      );
  }

  exportAllToPdf(): string {
    return `${this.url}/export-all-pdf`;
  }

  exportAllToXls(): string {
    return `${this.url}/export-all-xls`;
  }

  exportByPrestamoLibroToPdf(id: number): string {
    return `${this.url}/export-by-prestamo-pdf/${id}`;
  }

  exportByPrestamoLibroToXls(id: number): string {
    return `${this.url}/export-by-prestamo-xls/${id}`;
  }

  exportByDocenteToPdf(id: number): string {
    return `${this.url}/export-by-docente-pdf/${id}`;
  }

  exportByDocenteToXls(id: number): string {
    return `${this.url}/export-by-docente-xls/${id}`;
  }

  exportByGradoAndSeccionToPdf(grado: number, seccion: string): string {
    return `${this.url}/export-by-grado-seccion-pdf/${grado}/${seccion}`;
  }

  exportByGradoAndSeccionToXls(grado: number, seccion: string): string {
    return `${this.url}/export-by-grado-seccion-xls/${grado}/${seccion}`;
  }
}
