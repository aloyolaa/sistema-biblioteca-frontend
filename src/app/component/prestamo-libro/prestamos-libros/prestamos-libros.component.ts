import { Component, OnInit } from '@angular/core';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';

@Component({
  selector: 'app-prestamos-libros',
  templateUrl: './prestamos-libros.component.html',
  styleUrls: ['./prestamos-libros.component.css'],
})
export class PrestamosLibrosComponent implements OnInit {
  title = 'Préstamos de Libros';
  prestamos: PrestamoLibro[] = [];
  fechaPrestamoStart = '';
  fechaPrestamoEnd = '';
  page = 1;

  constructor(private prestamoLibroService: PrestamoLibroService) {}

  ngOnInit(): void {
    this.pagination();
  }

  getAll(): void {
    this.prestamoLibroService
      .getAll()
      .subscribe((prestamos) => (this.prestamos = prestamos));
  }

  pagination(): void {
    this.prestamoLibroService
      .pagination(this.page - 1)
      .subscribe((response) => {
        this.prestamos = response.content as PrestamoLibro[];
      });
  }

  paginationByFechaPrestamo(): void {
    this.prestamoLibroService
      .paginationByFechaPrestamo(
        this.fechaPrestamoStart,
        this.fechaPrestamoEnd,
        this.page - 1
      )
      .subscribe(
        (response) => (this.prestamos = response.content as PrestamoLibro[])
      );
  }

  cargarTodo(): void {
    this.page = 1;
    this.pagination();
    this.fechaPrestamoStart = '';
    this.fechaPrestamoEnd = '';
  }
}
