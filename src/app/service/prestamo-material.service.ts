import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { PrestamoMaterial } from '../core/model/prestamo-material.model';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PrestamoMaterialService {
  private url = `${environment.api_url}/prestamos-materiales`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<PrestamoMaterial[]> {
    return this.httpClient.get<PrestamoMaterial[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<PrestamoMaterial> {
    return this.httpClient
      .get<PrestamoMaterial>(`${this.url}/getOne/${id}`)
      .pipe(
        catchError((e) => {
          this.router.navigate(['/prestamos-materiales']);
          Swal.fire({
            icon: 'error',
            title: `${e.error.title}`,
            text: `${e.error.detail}`,
          });
          return throwError(() => e);
        })
      );
  }

  save(prestamoMaterial: PrestamoMaterial): Observable<PrestamoMaterial> {
    return this.httpClient
      .post<PrestamoMaterial>(`${this.url}/save`, prestamoMaterial)
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

  close(prestamoMaterial: PrestamoMaterial): Observable<PrestamoMaterial> {
    return this.httpClient
      .put<PrestamoMaterial>(`${this.url}/close`, prestamoMaterial)
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
        (response.content as PrestamoMaterial[]).forEach((prestamoMaterial) => {
          return prestamoMaterial;
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
          (response.content as PrestamoMaterial[]).forEach(
            (prestamoMaterial) => {
              return prestamoMaterial;
            }
          );
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
          (response.content as PrestamoMaterial[]).forEach(
            (prestamoMaterial) => {
              return prestamoMaterial;
            }
          );
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
          (response.content as PrestamoMaterial[]).forEach(
            (prestamoMaterial) => {
              return prestamoMaterial;
            }
          );
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
          (response.content as PrestamoMaterial[]).forEach(
            (prestamoMaterial) => {
              return prestamoMaterial;
            }
          );
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
          (response.content as PrestamoMaterial[]).forEach(
            (prestamoMaterial) => {
              return prestamoMaterial;
            }
          );
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
          (response.content as PrestamoMaterial[]).forEach(
            (prestamoMaterial) => {
              return prestamoMaterial;
            }
          );
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
          (response.content as PrestamoMaterial[]).forEach(
            (prestamoMaterial) => {
              return prestamoMaterial;
            }
          );
          return response;
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

  exportByPrestamoMaterialToPdf(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-prestamo-pdf/${id}`,
      httpOptions
    );
  }

  exportByPrestamoMaterialToXls(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-prestamo-xls/${id}`,
      httpOptions
    );
  }

  exportByDocenteToPdf(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-docente-pdf/${id}`,
      httpOptions
    );
  }

  exportByDocenteToXls(id: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-docente-xls/${id}`,
      httpOptions
    );
  }

  exportByGradoAndSeccionToPdf(grado: number, seccion: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-grado-seccion-pdf/${grado}/${seccion}`,
      httpOptions
    );
  }

  exportByGradoAndSeccionToXls(grado: number, seccion: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json',
    };
    return this.httpClient.get<any>(
      `${this.url}/export-by-grado-seccion-xls/${grado}/${seccion}`,
      httpOptions
    );
  }
}
