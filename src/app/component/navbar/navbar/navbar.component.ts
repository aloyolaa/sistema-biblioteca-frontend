import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model/usuario.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  usuario: Usuario;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.usuario = this.authService.getUsuario();
    this.authService
      .getLoginStatusSubjec()
      .asObservable()
      .subscribe(() => {
        this.isLoggedIn = this.authService.isAuthenticated();
        this.usuario = this.authService.getUsuario();
      });
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
