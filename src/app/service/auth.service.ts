import { Injectable } from '@angular/core';
import { Usuario } from '../core/model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const usuario = localStorage.getItem('usuario');
    if (usuario != null) {
      return JSON.parse(usuario);
    } else {
      this.logout();
      return null;
    }
    /*if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      localStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(
        String(localStorage.getItem('usuario'))
      ) as Usuario;
      console.log(String(localStorage.getItem('usuario')));
      return this._usuario;
    }
    return new Usuario();*/
  }

  getToken(): any {
    return String(localStorage.getItem('token'));
    /*if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      return String(localStorage.getItem('token'));
    }
    return '';*/
  }

  setUsuario(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /*obtenerDatosToken(accessToken: any): any {
    if (accessToken != null) {
      return accessToken.username;
    }
    return null;
  }

  /* obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(window.atob(accessToken.split('.')[1]).toString());
    }
    return null;
  } */

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
      return JSON.parse(atob(token.split('.')[1]))
    }
    return null;
  }

  hasRol(rol: string): boolean {
    for (let index = 0; index < this.getUsuario().roles.length; index++) {
      if (this.getUsuario().roles[index].nombre == rol) {
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
