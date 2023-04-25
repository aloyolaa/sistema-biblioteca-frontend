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

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
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
}
