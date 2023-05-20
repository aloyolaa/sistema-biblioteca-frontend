import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Material } from '../core/model/material.model';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private url = `${environment.api_url}/materiales`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Material[]> {
    return this.httpClient.get<Material[]>(`${this.url}/`);
  }

  getOne(codigo: number): Observable<Material> {
    return this.httpClient.get<Material>(`${this.url}/getOne/${codigo}`).pipe(
      catchError((e) => {
        this.router.navigate(['/materiales']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(material: Material): Observable<Material> {
    return this.httpClient.post<Material>(`${this.url}/save`, material).pipe(
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

  update(material: Material): Observable<Material> {
    return this.httpClient.put<Material>(`${this.url}/update`, material).pipe(
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

  getOneByCodigo(codigo: string): Observable<Material> {
    return this.httpClient
      .get<Material>(`${this.url}/getOneByCodigo/${codigo}`)
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
        (response.content as Material[]).forEach((material) => {
          return material;
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

  paginationByNombre(
    nombre: string,
    page: number,
    size: number
  ): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient
      .get(`${this.url}/paginationByNombre/${nombre}`, { params })
      .pipe(
        map((response: any) => {
          (response.content as Material[]).forEach((material) => {
            return material;
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
          (response.content as Material[]).forEach((material) => {
            return material;
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
          (response.content as Material[]).forEach((material) => {
            return material;
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

  exportAllToPdf(): string {
    return `${this.url}/export-all-pdf`;
  }

  exportAllToXls(): string {
    return `${this.url}/export-all-xls`;
  }

  exportByAreaToPdf(id: number): string {
    return `${this.url}/export-by-area-pdf/${id}`;
  }

  exportByAreaToXls(id: number): string {
    return `${this.url}/export-by-area-xls/${id}`;
  }

  exportByCategoriaToPdf(id: number): string {
    return `${this.url}/export-by-categoria-pdf/${id}`;
  }

  exportByCategoriaToXls(id: number): string {
    return `${this.url}/export-by-categoria-xls/${id}`;
  }

  exportByEditorialToPdf(id: number): string {
    return `${this.url}/export-by-editorial-pdf/${id}`;
  }

  exportByEditorialToXls(id: number): string {
    return `${this.url}/export-by-editorial-xls/${id}`;
  }

  exportByAutorToPdf(id: number): string {
    return `${this.url}/export-by-autor-pdf/${id}`;
  }

  exportByAutorToXls(id: number): string {
    return `${this.url}/export-by-autor-xls/${id}`;
  }
}
