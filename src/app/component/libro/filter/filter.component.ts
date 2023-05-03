import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/core/model/area.model';
import { Autor } from 'src/app/core/model/autor.model';
import { Categoria } from 'src/app/core/model/categoria.model';
import { Editorial } from 'src/app/core/model/editorial.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AreaService } from 'src/app/service/area.service';
import { AutorService } from 'src/app/service/autor.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { EditorialService } from 'src/app/service/editorial.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class LibroFilterComponent implements OnInit {
  title = 'Libros';
  libros: Libro[] = [];
  page = 1;
  id = 0;
  tipo = '';
  areas: Area[] = [];
  categorias: Categoria[] = [];
  editoriales: Editorial[] = [];
  autores: Autor[] = [];

  constructor(
    private libroService: LibroService,
    private areaService: AreaService,
    private categoriaService: CategoriaService,
    private editorialService: EditorialService,
    private autorService: AutorService
  ) {}

  ngOnInit(): void {
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
    this.categoriaService
      .getAll()
      .subscribe((categorias) => (this.categorias = categorias));
    this.editorialService
      .getAll()
      .subscribe((editoriales) => (this.editoriales = editoriales));
    this.autorService.getAll().subscribe((autores) => (this.autores = autores));
  }

  paginationByArea(): void {
    this.libroService
      .paginationByArea(this.id, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }

  paginationByCategoria(): void {
    this.libroService
      .paginationByCategoria(this.id, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }

  paginationByEditorial(): void {
    this.libroService
      .paginationByEditorial(this.id, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }

  paginationByAutor(): void {
    this.libroService
      .paginationByAutor(this.id, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }

  filtrar(): void {
    if (this.tipo == 'area') {
      this.paginationByArea();
    }
    if (this.tipo == 'categoria') {
      this.paginationByCategoria();
    }
    if (this.tipo == 'editorial') {
      this.paginationByEditorial();
    }
    if (this.tipo == 'autor') {
      this.paginationByAutor();
    }
  }
}
