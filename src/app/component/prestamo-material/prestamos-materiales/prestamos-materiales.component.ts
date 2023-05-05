import { Component, OnInit } from '@angular/core';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-prestamos-materiales',
  templateUrl: './prestamos-materiales.component.html',
  styleUrls: ['./prestamos-materiales.component.css'],
})
export class PrestamosMaterialesComponent implements OnInit {
  title = 'Préstamos de Materiales';
  prestamos: PrestamoMaterial[] = [];
  fechaPrestamoStart = '';
  fechaPrestamoEnd = '';
  page = 1;

  constructor(private prestamoMaterialService: PrestamoMaterialService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.prestamoMaterialService
      .getAll()
      .subscribe((prestamos) => (this.prestamos = prestamos));
  }

  paginationByFechaPrestamo(): void {
    this.prestamoMaterialService
      .paginationByFechaPrestamo(
        this.fechaPrestamoStart,
        this.fechaPrestamoEnd,
        this.page - 1
      )
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoMaterial[])
      );
  }

  cargarTodo(): void {
    this.getAll();
    this.fechaPrestamoStart = '';
    this.fechaPrestamoEnd = '';
  }
}
