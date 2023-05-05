import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/model/categoria.model';
import { Libro } from 'src/app/core/model/libro.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-categoria',
  templateUrl: './filter-categoria.component.html',
  styleUrls: ['./filter-categoria.component.css'],
})
export class LibroFilterCategoriaComponent implements OnInit {
  title = 'Libros';
  libros: Libro[] = [];
  page = 1;
  id = 0;
  categorias: Categoria[] = [];

  constructor(
    private libroService: LibroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService
      .getAll()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  paginationByCategoria(): void {
    this.libroService
      .paginationByCategoria(this.id, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }
}
