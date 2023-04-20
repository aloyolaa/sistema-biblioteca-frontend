import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/app/core/model/docente.model';
import { DocenteService } from 'src/app/service/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class DocenteFormComponent {
  title = 'Formulario de Docente';
  docente: Docente = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
  };
  errors = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
  };

  constructor(
    private docenteService: DocenteService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeDocente();
  }

  chargeDocente(): void {
    this.activedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.docenteService
          .getOne(id)
          .subscribe((docente) => (this.docente = docente));
      }
    });
  }

  save(): void {
    this.docenteService.save(this.docente).subscribe({
      next: (docente) => {
        this.router.navigate(['/docentes/detail', docente.id]).then(() => {
          console.log(docente);
          Swal.fire({
            icon: 'success',
            title: 'Docente guardado correctamente.',
            text: `Docente ${docente.nombre} ha sido guardado.`,
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
    this.docenteService.update(this.docente).subscribe({
      next: (docente) => {
        this.router.navigate(['/docentes/detail', docente.id]).then(() => {
          console.log(docente);
          Swal.fire({
            icon: 'success',
            title: 'Area actualizada correctamente.',
            text: `Area ${docente.nombre} ha sido guardada.`,
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