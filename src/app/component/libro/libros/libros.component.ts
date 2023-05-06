import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/core/model/libro.model';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  title = 'Libros';
  libros: Libro[] = [];
  buscar = '';
  tipo = '';
  page = 1;

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.pagination();
  }

  getAll(): void {
    this.libroService.getAll().subscribe((libros) => (this.libros = libros));
  }

  delete(libro: Libro): void {
    this.libroService.delete(libro.id).subscribe((response) => {
      console.log(response);
      if (response) {
        const index = this.libros.findIndex((a) => a.id === libro.id);
        this.libros.splice(index, 1);
      }
    });
  }

  pagination(): void {
    this.libroService.pagination(this.page - 1).subscribe((response) => {
      this.libros = response.content as Libro[];
    });
  }

  paginationByTitulo(): void {
    this.libroService
      .paginationByTitulo(this.buscar, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }

  paginationByCodigo(): void {
    this.libroService
      .paginationByCodigo(this.buscar, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
      });
  }

  buscador(): void {
    if (this.tipo == 'titulo') {
      this.paginationByTitulo();
    } else {
      this.paginationByCodigo();
    }
  }

  cargarTodo(): void {
    this.page = 1;
    this.pagination();
    this.buscar = '';
    this.tipo = '';
  }
}
