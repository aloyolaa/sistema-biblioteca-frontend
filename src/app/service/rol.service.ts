import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Rol } from '../core/model/rol.model';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${environment.api_url}/roles`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(`${this.url}/`);
  }
}
