import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Docente } from '../core/model/docente.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  private url = 'http://localhost:8080/api/v1/docentes';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Docente[]> {
    return this.httpClient.get<Docente[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Docente> {
    return this.httpClient.get<Docente>(`${this.url}/getOne/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/docentes']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(docente: Docente): Observable<Docente> {
    return this.httpClient.post<Docente>(`${this.url}/save`, docente).pipe(
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

  update(docente: Docente): Observable<Docente> {
    return this.httpClient.put<Docente>(`${this.url}/update`, docente).pipe(
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
}
