import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/core/model/rol.model';
import { Usuario } from 'src/app/core/model/usuario.model';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class UsuarioRegisterComponent implements OnInit {
  usuario: Usuario = new Usuario();
  dataRol = {
    rol: new Rol(),
  };
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolService.getAll().subscribe((roles) => (this.roles = roles));
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
    if (this.dataRol.rol.id) {
      this.usuario.roles.push(this.dataRol.rol);
    }
    this.usuarioService.save(this.usuario).subscribe({
      next: (usuario) => {
        this.router
          .navigate(['/admin/usuarios/detail', usuario.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario guardado correctamente.',
              text: `Usuario ${usuario.username} ha sido guardado.`,
            });
          });
      },
      error: (e) => {
        this.errors = e.error.errors;
      },
    });
  }
}
