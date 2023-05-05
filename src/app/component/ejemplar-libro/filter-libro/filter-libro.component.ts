import { Component } from '@angular/core';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { Libro } from 'src/app/core/model/libro.model';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-ejemplar-libro-filter-libro',
  templateUrl: './filter-libro.component.html',
  styleUrls: ['./filter-libro.component.css']
})
export class EjemplarLibroFilterLibroComponent {
  title = 'Ejemplares de Libros';
  ejemplares: EjemplarLibro[] = [];
  libro: Libro = new Libro();
  codigo: string = '';
  page = 1;

  constructor(
    private ejemplarLibroService: EjemplarLibroService,
    private libroService: LibroService
  ) {}

  paginationByLibro(): void {
    this.ejemplarLibroService
      .paginationByLibro(this.codigo, this.page - 1)
      .subscribe(
        (response) => (this.ejemplares = response.content as EjemplarLibro[])
      );
  }

  getOneByCodigo(): void {
    this.libroService
      .getOneByCodigo(this.codigo)
      .subscribe((libro) => (this.libro = libro));
  }
}
