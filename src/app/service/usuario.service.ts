import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../core/model/usuario.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioDto } from '../core/dto/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${environment.api_url}/usuarios`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.url}/getOne/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/usuarios']);
        Swal.fire({
          icon: 'error',
          title: `${e.error.title}`,
          text: `${e.error.detail}`,
        });
        return throwError(() => e);
      })
    );
  }

  getOneByUsername(username: string): Observable<UsuarioDto> {
    return this.httpClient.get<UsuarioDto>(`${this.url}/getOneByUsername/${username}`).pipe(
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

  save(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.url}/save`, usuario).pipe(
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

  update(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.url}/update`, usuario).pipe(
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

  pagination(page: number, size: number): Observable<any> {
    const params = {
      page: page,
      size: size,
    };
    return this.httpClient.get(`${this.url}/pagination`, { params }).pipe(
      map((response: any) => {
        (response.content as Usuario[]).forEach((usuario) => {
          return usuario;
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
}
