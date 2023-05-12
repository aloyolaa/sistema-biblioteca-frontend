import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-libro-cerrar',
  templateUrl: './cerrar.component.html',
  styleUrls: ['./cerrar.component.css'],
})
export class PrestamoLibroCerrarComponent {
  prestamo: PrestamoLibro = new PrestamoLibro();

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('id'));
      if (id) {
        this.prestamoLibroService.getOne(id).subscribe((prestamo) => {
          this.prestamo = prestamo;
        });
      }
    });
  }

  close(): void {
    this.prestamoLibroService.close(this.prestamo).subscribe({
      next: (prestamo) => {
        this.router
          .navigate(['/prestamos-libros/detail', prestamo.id])
          .then(() => {
            console.log(prestamo);
            Swal.fire({
              icon: 'success',
              title: 'Préstamo cerrado correctamente.',
              text: `Préstamo de Materiales ${prestamo.id} ha sido cerrado.`,
            });
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
