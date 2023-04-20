import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Area } from '../core/model/area.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private url = 'http://localhost:8080/api/v1/areas';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Area[]> {
    return this.httpClient.get<Area[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Area> {
    return this.httpClient.get<Area>(`${this.url}/getOne/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/areas']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  save(area: Area): Observable<Area> {
    return this.httpClient.post<Area>(`${this.url}/save`, area).pipe(
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

  update(area: Area): Observable<Area> {
    return this.httpClient.put<Area>(`${this.url}/update`, area).pipe(
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
}
