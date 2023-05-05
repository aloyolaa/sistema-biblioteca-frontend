import { Component } from '@angular/core';
import { Docente } from 'src/app/core/model/docente.model';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { DocenteService } from 'src/app/service/docente.service';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-prestamo-material-filter-docente',
  templateUrl: './filter-docente.component.html',
  styleUrls: ['./filter-docente.component.css'],
})
export class PrestamoMaterialFilterDocenteComponent {
  title = 'Préstamos de Materiales';
  prestamos: PrestamoMaterial[] = [];
  docente: Docente = new Docente();
  dni: string = '';
  fechaPrestamoStart = '';
  fechaPrestamoEnd = '';
  page = 1;

  constructor(
    private prestamoMaterialService: PrestamoMaterialService,
    private docenteService: DocenteService
  ) {}

  paginationByDocente(): void {
    this.prestamoMaterialService
      .paginationByDocente(this.dni, this.page - 1)
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoMaterial[])
      );
      this.fechaPrestamoStart = '';
      this.fechaPrestamoEnd = '';
  }

  paginationByFechaPrestamoAndDocente(): void {
    this.prestamoMaterialService
      .paginationByFechaPrestamoAndDocente(
        this.fechaPrestamoStart,
        this.fechaPrestamoEnd,
        this.docente.id,
        this.page - 1
      )
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoMaterial[])
      );
  }

  getOneByDni(): void {
    this.docenteService
      .getOneByDni(this.dni)
      .subscribe((docente) => (this.docente = docente));
  }
}
