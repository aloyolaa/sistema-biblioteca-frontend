import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/core/model/autor.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AutorService } from 'src/app/service/autor.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-editorial',
  templateUrl: './filter-editorial.component.html',
  styleUrls: ['./filter-editorial.component.css'],
})
export class LibroFilterEditorialComponent implements OnInit {
  title = 'Libros';
  libros: Libro[] = [];
  page = 1;
  id = 0;
  autores: Autor[] = [];

  constructor(
    private libroService: LibroService,
    private autorService: AutorService
  ) {}

  ngOnInit(): void {
    this.autorService.getAll().subscribe((autores) => (this.autores = autores));
  }

  paginationByAutor(): void {
    this.libroService
      .paginationByAutor(this.id, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }
}
