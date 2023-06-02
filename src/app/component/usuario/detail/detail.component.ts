import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDto } from 'src/app/core/dto/usuario.dto';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class UsuarioDetailComponent implements OnInit {
  usuario: UsuarioDto = new UsuarioDto();

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.usuarioService.getOne(id).subscribe((usuario) => {
          this.usuario = usuario;
        });
      }
    });
  }

  delete(): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al usuario ${this.usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(this.usuario.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Eliminado!',
            text: `Usuario ${this.usuario.username} eliminado con éxito.`,
          });
          this.router.navigate([this.routerLink() + '/usuarios']);
        });
      }
    });
  }

  esUsuarioActual(): boolean {
    return this.usuario.id == this.authService.getUsuario().id;
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
