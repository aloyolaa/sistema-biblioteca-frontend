import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePrestamoLibro } from 'src/app/core/model/detalle-prestamo-libro.model';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-prestamo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class PrestamoLibroDetailComponent implements OnInit {
  prestamo: PrestamoLibro = new PrestamoLibro();

  columnas: string[] = ['codigo', 'titulo', 'estado'];
  dataSource: MatTableDataSource<DetallePrestamoLibro> =
    new MatTableDataSource();

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.prestamoLibroService.getOne(id).subscribe((prestamo) => {
          this.prestamo = prestamo;
          this.dataSource.data = this.prestamo.detalle;
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

  exportByPrestamoLibroToPdf(): string {
    return this.prestamoLibroService.exportByPrestamoLibroToPdf(
      this.prestamo.id
    );
  }

  exportByPrestamoLibroToXls(): string {
    return this.prestamoLibroService.exportByPrestamoLibroToXls(
      this.prestamo.id
    );
  }
}
