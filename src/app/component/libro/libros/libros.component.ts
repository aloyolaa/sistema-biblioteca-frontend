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

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.getAll();
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

  getAllByTitulo(): void {
    this.libroService
      .getAllByTitulo(this.buscar)
      .subscribe((libros) => (this.libros = libros));
  }

  getAllByCodigo(): void {
    this.libroService
      .getAllByCodigo(this.buscar)
      .subscribe((libros) => (this.libros = libros));
  }

  buscador(): void {
    if (this.tipo == 'titulo') {
      this.getAllByTitulo();
    } else {
      this.getAllByCodigo();
    }
  }

  cargarTodo(): void {
    this.getAll();
    this.buscar = '';
    this.tipo = '';
  }
}
