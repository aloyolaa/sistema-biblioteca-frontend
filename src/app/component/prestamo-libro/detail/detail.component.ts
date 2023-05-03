import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-prestamo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class PrestamoLibroDetailComponent implements OnInit {
  title = 'Detalle del Préstamo';
  prestamo: PrestamoLibro = new PrestamoLibro();
  ejemplares = 0;
  ejemplaresDisponibles = 0;

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

  delete(prestamo: PrestamoLibro): void {
    const withBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    withBootstrapButtons
      .fire({
        title: '¿Esta seguro de eliminar este préstamo',
        text: `El préstamo se eliminará?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, elimínalo',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.prestamoLibroService
            .delete(prestamo.id)
            .subscribe((response) => {
              console.log(response);
              if (response) {
                withBootstrapButtons.fire(
                  'Préstamo eliminado satisfactoriamente',
                  `Préstamo ${prestamo.id} eliminado.`,
                  'success'
                );
                this.router.navigate(['/prestamos-libros']);
              }
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
              text: `Préstamo ${prestamo.id} ha sido cerrado.`,
            });
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
