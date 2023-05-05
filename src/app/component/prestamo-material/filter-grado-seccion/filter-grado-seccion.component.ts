import { Component } from '@angular/core';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-prestamo-material-filter-grado-seccion',
  templateUrl: './filter-grado-seccion.component.html',
  styleUrls: ['./filter-grado-seccion.component.css'],
})
export class PrestamoMaterialFilterGradoSeccionComponent {
  title = 'Préstamos de Materiales';
  prestamos: PrestamoMaterial[] = [];
  grado = 0;
  seccion = '';
  fechaPrestamoStart = '';
  fechaPrestamoEnd = '';
  page = 1;

  constructor(private prestamoMaterialService: PrestamoMaterialService) {}

  paginationByGradoAndSeccion(): void {
    this.prestamoMaterialService
      .paginationByGradoAndSeccion(this.grado, this.seccion, this.page - 1)
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoMaterial[])
      );
      this.fechaPrestamoStart = '';
      this.fechaPrestamoEnd = '';
  }

  paginationByFechaPrestamoAndGradoAndSeccion(): void {
    this.prestamoMaterialService
      .paginationByFechaPrestamoAndGradoAndSeccion(
        this.fechaPrestamoStart,
        this.fechaPrestamoEnd,
        this.grado,
        this.seccion,
        this.page - 1
      )
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoMaterial[])
      );
  }
}
