import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Editorial } from '../core/model/editorial.model';

@Injectable({
  providedIn: 'root',
})
export class EditorialService {
  private url = 'http://localhost:8080/api/v1/editoriales';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Editorial[]> {
    return this.httpClient.get<Editorial[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Editorial> {
    return this.httpClient.get<Editorial>(`${this.url}/getOne/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/editoriales']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(editorial: Editorial): Observable<Editorial> {
    return this.httpClient.post<Editorial>(`${this.url}/save`, editorial).pipe(
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

  update(editorial: Editorial): Observable<Editorial> {
    return this.httpClient.put<Editorial>(`${this.url}/update`, editorial).pipe(
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
