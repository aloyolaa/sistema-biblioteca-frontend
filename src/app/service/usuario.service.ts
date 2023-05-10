import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'http://localhost:8080/api/v1/usuarios';

  constructor(private httpClient: HttpClient) {}

  public añadirUsuario(usuario: any) {
    return this.httpClient.post(`${this.url}/save`, usuario);
  }
}
