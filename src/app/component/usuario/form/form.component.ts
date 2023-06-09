import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDto } from 'src/app/core/dto/usuario.dto';
import { Rol } from 'src/app/core/model/rol.model';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  usuario: UsuarioDto = new UsuarioDto();
  errors = {
    username: '',
    email: '',
    nombres: '',
    apellidos: '',
    roles: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeUsuario();
  }

  chargeUsuario(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.usuarioService
          .getOne(id)
          .subscribe((usuario) => (this.usuario = usuario));
      }
    });
  }

  limpiar(): void {
    this.errors = {
      username: '',
      email: '',
      nombres: '',
      apellidos: '',
      roles: '',
    };
  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe({
      next: (usuario) => {
        this.router
          .navigate(['/admin/usuarios/detail', usuario.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario actualizado correctamente.',
              text: `Usuario ${usuario.username} ha sido guardado.`,
            });
          });
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
    });
  }
}
