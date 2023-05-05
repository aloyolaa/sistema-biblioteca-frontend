import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { PrestamoMaterial } from '../core/model/prestamo-material.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PrestamoMaterialService {
  private url = 'http://localhost:8080/api/v1/prestamos-materiales';

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

  paginationByDocente(dni: string, page: number): Observable<any> {
    return this.httpClient
      .get(`${this.url}/paginationByDocente/${dni}/${page}`)
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

  paginationByGradoAndSeccion(
    grado: number,
    seccion: string,
    page: number
  ): Observable<any> {
    return this.httpClient
      .get(
        `${this.url}/paginationByGradoAndSeccion/${grado}/${seccion}/${page}`
      )
      .pipe(
        map((response: any) => {
          (response.content as PrestamoMaterial[]).forEach((prestamoMaterial) => {
            return prestamoMaterial;
          });
          return response;
        })
      );
  }

  paginationByFechaPrestamo(
    fechaPrestamoStartStr: string,
    fechaPrestamoEndStr: string,
    page: number
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
    return this.httpClient
      .get(
        `${this.url}/paginationByFechaPrestamo/${fechaPrestamoStartStr}/${fechaPrestamoEndStr}/${page}`
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

  paginationByFechaPrestamoAndDocente(
    fechaPrestamoStartStr: string,
    fechaPrestamoEndStr: string,
    docenteId: number,
    page: number
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
    return this.httpClient
      .get(
        `${this.url}/paginationByFechaPrestamoAndDocente/${fechaPrestamoStartStr}/${fechaPrestamoEndStr}/${docenteId}/${page}`
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
    page: number
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
    return this.httpClient
      .get(
        `${this.url}/paginationByFechaPrestamoAndGradoAndSeccion/${fechaPrestamoStartStr}/${fechaPrestamoEndStr}/${grado}/${seccion}/${page}`
      )
      .pipe(
        map((response: any) => {
          (response.content as PrestamoMaterial[]).forEach((prestamoMaterial) => {
            return prestamoMaterial;
          });
          return response;
        })
      );
  }
}
