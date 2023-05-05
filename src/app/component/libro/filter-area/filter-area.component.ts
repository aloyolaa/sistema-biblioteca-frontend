import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/core/model/area.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AreaService } from 'src/app/service/area.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.css'],
})
export class LibroFilterAreaComponent implements OnInit {
  title = 'Libros';
  libros: Libro[] = [];
  page = 1;
  pages = 0;
  id = 0;
  areas: Area[] = [];

  constructor(
    private libroService: LibroService,
    private areaService: AreaService
  ) {}

  ngOnInit(): void {
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  paginationByArea(): void {
    this.libroService
      .paginationByArea(this.id, this.page - 1)
      .subscribe((response) => {
        this.libros = response.content as Libro[];
        this.pages = response.totalPages;
      });
  }
}
