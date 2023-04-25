import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EjemplarMaterial } from '../core/model/ejemplar-material.model';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EjemplarMaterialService {
  private url = 'http://localhost:8080/api/v1/ejemplares-materiales';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<EjemplarMaterial[]> {
    return this.httpClient.get<EjemplarMaterial[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<EjemplarMaterial> {
    return this.httpClient
      .get<EjemplarMaterial>(`${this.url}/getOne/${id}`)
      .pipe(
        catchError((e) => {
          this.router.navigate(['/ejemplares-materiales']);
          Swal.fire({
            icon: 'error',
            title: `${e.error.title}`,
            text: `${e.error.detail}`,
          });
          return throwError(() => e);
        })
      );
  }

  save(materialId: number, cantidad: number): Observable<boolean> {
    return this.httpClient
      .get<boolean>(`${this.url}/save/${materialId}/${cantidad}`)
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

  update(ejemplarLibro: EjemplarMaterial): Observable<EjemplarMaterial> {
    return this.httpClient
      .put<EjemplarMaterial>(`${this.url}/update`, ejemplarLibro)
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

  countByMaterial(codigo: string): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/countByMaterial/${codigo}`);
  }

  countByMaterialAndEstado(codigo: string): Observable<number> {
    return this.httpClient.get<number>(
      `${this.url}/countByMaterialAndEstado/${codigo}`
    );
  }
}
