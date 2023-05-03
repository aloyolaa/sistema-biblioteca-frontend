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

  constructor(private prestamoLibroService: PrestamoLibroService) {}

  ngOnInit(): void {
    this.prestamoLibroService
      .getAll()
      .subscribe((prestamos) => (this.prestamos = prestamos));
  }
}
