import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDto } from 'src/app/core/dto/usuario.dto';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioDto = new UsuarioDto();
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
    if (this.authService.isAuthenticated()) {
      if (this.authService.hasRol('ROLE_ADMIN')) {
        this.router.navigate(['/admin/']);
      } else {
        this.router.navigate(['/user/']);
      }
      Swal.fire({
        icon: 'success',
        title: 'Login',
        text: `Hola ${
          this.authService.getUsuario().username
        } ya estás autenticado!`,
      });
    }
  }

  login(): void {
    this.authService
      .login(this.loginData.username, this.loginData.password)
      .subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.usuarioService.getOneByUsername(response.username).subscribe({
            next: (usuario) => {
              this.usuario = usuario;
              this.authService.setUsuario(this.usuario);
              window.location.reload();
              if (this.authService.hasRol('ROLE_ADMIN')) {
                this.router.navigate(['/admin/']);
              } else {
                this.router.navigate(['/user/']);
              }
              Swal.fire({
                icon: 'success',
                title: 'Login',
                text: `Hola ${this.usuario.username}, has iniciado sesión con éxito!`,
              });
            },
            error: (e) => {
              console.log(e);
            },
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
