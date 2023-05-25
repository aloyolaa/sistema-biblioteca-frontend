import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/model/usuario.model';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      Swal.fire({
        icon: 'info',
        title: 'Login',
        text: `Hola ${
          this.authService.getUsuario().username
        } ya estás autenticado!`,
      });
      this.router.navigate(['/libros']);
    }
  }

  login(): void {
    this.authService
      .login(this.loginData.username, this.loginData.password)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.usuarioService
            .getOneByUsername(response.sub)
            .subscribe((usuario) => (this.usuario = usuario));
          this.authService.setUsuario(this.usuario);
          this.authService.setToken(response.token);
          this.router.navigate(['/']);
          Swal.fire({
            icon: 'success',
            title: 'Login',
            text: `Hola ${this.usuario.username}, has iniciado sesión con éxito!`,
          });
        },
        error: (err) => {
          if (err.status == 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error Login',
              text: `Usuario o password incorrectos!`,
            });
          }
        },
      });
  }
}
