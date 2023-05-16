import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejemplar-libro-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class EjemplarLibroFormComponent implements OnInit {
  ejemplarLibro: EjemplarLibro = new EjemplarLibro();

  constructor(
    private ejemplarLibroService: EjemplarLibroService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeEjemplarLibro();
  }

  chargeEjemplarLibro(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.ejemplarLibroService
          .getOne(id)
          .subscribe((ejemplarLibro) => (this.ejemplarLibro = ejemplarLibro));
      }
    });
  }

  update(): void {
    this.ejemplarLibroService.update(this.ejemplarLibro).subscribe({
      next: (ejemplarLibro) => {
        this.router
          .navigate(['/ejemplares-libros/detail', ejemplarLibro.id])
          .then(() => {
            console.log(ejemplarLibro);
            Swal.fire({
              icon: 'success',
              title: 'Ejemplar actualizado correctamente.',
              text: `Ejemplar ${ejemplarLibro.libro.codigo} - ${ejemplarLibro.numero} ha sido guardado.`,
            });
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
