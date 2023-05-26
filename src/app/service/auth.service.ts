import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../core/dto/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post('http://localhost:8080/login', {
      username,
      password,
    });
  }

  getUsuario(): any {
    const usuario: any = localStorage.getItem('usuario');
    if (usuario != null) {
      return JSON.parse(usuario) as UsuarioDto;
    }
    this.logout();
    return null;
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  setUsuario(usuario: UsuarioDto): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token != null && usuario != null) {
      return true;
    }
    return false;
  }

  obtenerDatos(token: string): any {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  hasRol(rol: string): boolean {
    for (let index = 0; index < this.getUsuario().roles.length; index++) {
      if (this.getUsuario().roles[index].nombre === rol) {
        return true;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
