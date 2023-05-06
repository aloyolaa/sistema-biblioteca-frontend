import { Component, OnInit } from '@angular/core';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';

@Component({
  selector: 'app-ejemplar-libro-ejemplares',
  templateUrl: './ejemplares-libros.component.html',
  styleUrls: ['./ejemplares-libros.component.css'],
})
export class EjemplaresLibrosComponent implements OnInit {
  title = 'Ejemplares de Libros';
  ejemplares: EjemplarLibro[] = [];
  page = 1;

  constructor(private ejemplarLibroService: EjemplarLibroService) {}

  ngOnInit(): void {
    this.pagination();
  }

  pagination(): void {
    this.ejemplarLibroService
      .pagination(this.page - 1)
      .subscribe((response) => {
        this.ejemplares = response.content as EjemplarLibro[];
      });
  }
}
