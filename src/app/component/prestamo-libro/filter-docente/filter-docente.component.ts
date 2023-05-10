import { Component } from '@angular/core';
import { Docente } from 'src/app/core/model/docente.model';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { DocenteService } from 'src/app/service/docente.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';

@Component({
  selector: 'app-prestamo-libro-filter-docente',
  templateUrl: './filter-docente.component.html',
  styleUrls: ['./filter-docente.component.css'],
})
export class PrestamoLibroFilterDocenteComponent {
  title = 'Préstamos de Libros';
  prestamos: PrestamoLibro[] = [];
  docente: Docente = new Docente();
  dni: string = '';
  fechaPrestamoStart = '';
  fechaPrestamoEnd = '';
  page = 1;

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private docenteService: DocenteService
  ) {}

  paginationByDocente(): void {
    /* this.prestamoLibroService
      .paginationByDocente(this.dni, this.page - 1)
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoLibro[])
      );
      this.fechaPrestamoStart = '';
      this.fechaPrestamoEnd = ''; */
  }

  paginationByFechaPrestamoAndDocente(): void {
    /* this.prestamoLibroService
      .paginationByFechaPrestamoAndDocente(
        this.fechaPrestamoStart,
        this.fechaPrestamoEnd,
        this.docente.id,
        this.page - 1
      )
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoLibro[])
      ); */
  }

  getOneByDni(): void {
    this.docenteService
      .getOneByDni(this.dni)
      .subscribe((docente) => (this.docente = docente));
  }
}
