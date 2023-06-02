import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/app/core/model/docente.model';
import { AuthService } from 'src/app/service/auth.service';
import { DocenteService } from 'src/app/service/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class DocenteFormComponent implements OnInit {
  docente: Docente = new Docente();
  errors = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
  };

  constructor(
    private docenteService: DocenteService,
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeDocente();
  }

  chargeDocente(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.docenteService
          .getOne(id)
          .subscribe((docente) => (this.docente = docente));
      }
    });
  }

  limpiar(): void {
    this.errors = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
    };
  }

  save(): void {
    this.docenteService.save(this.docente).subscribe({
      next: (docente) => {
        this.router
          .navigate([this.routerLink() + '/docentes/detail', docente.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Docente guardado correctamente.',
              text: `Docente ${docente.nombre} ${docente.apellido} ha sido guardado.`,
            });
          });
      },
      error: (e) => {
        this.errors = e.error.errors;
      },
    });
  }

  update(): void {
    this.docenteService.update(this.docente).subscribe({
      next: (docente) => {
        this.router
          .navigate([this.routerLink() + '/docentes/detail', docente.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Docente actualizado correctamente.',
              text: `Docente ${docente.nombre} ${docente.apellido} ha sido guardado.`,
            });
          });
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
