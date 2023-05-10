import { Component } from '@angular/core';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';

@Component({
  selector: 'app-prestamo-libro-filter-grado-seccion',
  templateUrl: './filter-grado-seccion.component.html',
  styleUrls: ['./filter-grado-seccion.component.css'],
})
export class PrestamoLibroFilterGradoSeccionComponent {
  title = 'Préstamos de Libros';
  prestamos: PrestamoLibro[] = [];
  grado = 0;
  seccion = '';
  fechaPrestamoStart = '';
  fechaPrestamoEnd = '';
  page = 1;

  constructor(private prestamoLibroService: PrestamoLibroService) {}

  paginationByGradoAndSeccion(): void {
    /* this.prestamoLibroService
      .paginationByGradoAndSeccion(this.grado, this.seccion, this.page - 1)
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoLibro[])
      );
      this.fechaPrestamoStart = '';
      this.fechaPrestamoEnd = ''; */
  }

  paginationByFechaPrestamoAndGradoAndSeccion(): void {
    /* this.prestamoLibroService
      .paginationByFechaPrestamoAndGradoAndSeccion(
        this.fechaPrestamoStart,
        this.fechaPrestamoEnd,
        this.grado,
        this.seccion,
        this.page - 1
      )
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoLibro[])
      ); */
  }
}
