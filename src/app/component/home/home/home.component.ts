import { Component } from '@angular/core';
import { AreaService } from 'src/app/service/area.service';
import { AutorService } from 'src/app/service/autor.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { DocenteService } from 'src/app/service/docente.service';
import { EditorialService } from 'src/app/service/editorial.service';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { LibroService } from 'src/app/service/libro.service';
import { MaterialService } from 'src/app/service/material.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  areas: number = 0;
  autores: number = 0;
  categorias: number = 0;
  docentes: number = 0;
  editoriales: number = 0;
  ejemplaresLibros: number = 0;
  ejemplaresMateriales: number = 0;
  libros: number = 0;
  materiales: number = 0;
  prestamosLibros: number = 0;
  prestamosMateriales: number = 0;

  constructor(
    private areaService: AreaService,
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private docenteService: DocenteService,
    private editorialService: EditorialService,
    private ejemplaresLibrosService: EjemplarLibroService,
    private ejemplaresMaterialesService: EjemplarMaterialService,
    private libroService: LibroService,
    private materialService: MaterialService,
    private prestamoLibrosService: PrestamoLibroService,
    private prestamoMaterialService: PrestamoMaterialService
  ) {}

  ngOnInit(): void {
    this.countArea();
    this.countAutor();
    this.countCategoria();
    this.countDocente();
    this.countEditorial();
    this.countEjemplarLibro();
    this.countEjemplarMaterial();
    this.countLibro();
    this.countMaterial();
    this.countPrestamoLibro();
    this.countPrestamoMaterial();
  }

  countArea(): void {
    this.areaService.count().subscribe((count) => (this.areas = count));
  }

  countAutor(): void {
    this.autorService.count().subscribe((count) => (this.autores = count));
  }

  countCategoria(): void {
    this.categoriaService
      .count()
      .subscribe((count) => (this.categorias = count));
  }

  countDocente(): void {
    this.docenteService.count().subscribe((count) => (this.docentes = count));
  }

  countEditorial(): void {
    this.editorialService
      .count()
      .subscribe((count) => (this.editoriales = count));
  }

  countEjemplarLibro(): void {
    this.ejemplaresLibrosService
      .count()
      .subscribe((count) => (this.ejemplaresLibros = count));
  }

  countEjemplarMaterial(): void {
    this.ejemplaresMaterialesService
      .count()
      .subscribe((count) => (this.ejemplaresMateriales = count));
  }

  countLibro(): void {
    this.libroService.count().subscribe((count) => (this.libros = count));
  }

  countMaterial(): void {
    this.materialService
      .count()
      .subscribe((count) => (this.materiales = count));
  }

  countPrestamoLibro(): void {
    this.prestamoLibrosService
      .count()
      .subscribe((count) => (this.prestamosLibros = count));
  }

  countPrestamoMaterial(): void {
    this.prestamoMaterialService
      .count()
      .subscribe((count) => (this.prestamosMateriales = count));
  }
}
