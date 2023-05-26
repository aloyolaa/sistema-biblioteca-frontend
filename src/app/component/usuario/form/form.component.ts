import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/core/model/rol.model';
import { Usuario } from 'src/app/core/model/usuario.model';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  usuario: Usuario = new Usuario();
  rol: Rol;
  roles: Rol[] = [];
  errors = {
    username: '',
    password: '',
    email: '',
    nombres: '',
    apellidos: '',
    roles: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeLibro();
    this.rolService.getAll().subscribe((roles) => (this.roles = roles));
    this.rol = new Rol();
  }

  chargeLibro(): void {
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
      password: '',
      email: '',
      nombres: '',
      apellidos: '',
      roles: '',
    };
  }

  save(): void {
    this.usuario.roles.push(this.rol);
    console.log(this.usuario);
    this.usuarioService.save(this.usuario).subscribe({
      next: (usuario) => {
        this.router.navigate(['/admin/usuarios/detail', usuario.id]).then(() => {
          console.log(usuario);
          Swal.fire({
            icon: 'success',
            title: 'Usuario guardado correctamente.',
            text: `Usuario ${usuario.username} ha sido guardado.`,
          });
        });
      },
      error: (e) => {
        this.errors = e.error.errors;
        console.log(this.errors);
      },
    });
  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe({
      next: (usuario) => {
        this.router.navigate(['/admin/usuarios/detail', usuario.id]).then(() => {
          console.log(usuario);
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado correctamente.',
            text: `Usuario ${usuario.username} ha sido guardado.`,
          });
        });
      },
      error: (err) => {
        this.errors = err.error.errors;
        console.log(this.errors);
      },
    });
  }
}
