import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class LibroFormComponent implements OnInit {
  title = 'Formulario de Libro';
  libro: Libro = new Libro();
  areas: Area[] = [];
  categorias: Categoria[] = [];
  editoriales: Editorial[] = [];
  errors = {
    codigo: '',
    titulo: '',
    anio: '',
    grado: '',
    area: '',
    categoria: '',
    editorial: '',
    autores: '',
  };
  autocompleteControl = new FormControl('');
  filteredAutores: Observable<Autor[]>;

  constructor(
    private libroService: LibroService,
    private areaService: AreaService,
    private categoriaService: CategoriaService,
    private editorialService: EditorialService,
    private autorService: AutorService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeLibro();
    this.filteredAutores = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : '')),
      mergeMap((value) => (value ? this._filter(value || '') : []))
    );
    this.categoriaService
      .getAll()
      .subscribe((categorias) => (this.categorias = categorias));
    this.editorialService
      .getAll()
      .subscribe((editoriales) => (this.editoriales = editoriales));
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  chargeLibro(): void {
    this.activedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.libroService.getOne(id).subscribe((libro) => (this.libro = libro));
      }
    });
  }

  save(): void {
    console.log(this.libro);
    this.libroService.save(this.libro).subscribe({
      next: (libro) => {
        this.router.navigate(['/libros/detail', libro.id]).then(() => {
          console.log(libro);
          Swal.fire({
            icon: 'success',
            title: 'Libro guardado correctamente.',
            text: `Libro ${libro.titulo} ha sido guardado.`,
          });
        });
      },
      error: (e) => {
        this.errors = e.error.errors;
        console.log(this.errors);
      },
    });
  }

  update(): void {
    this.libroService.update(this.libro).subscribe({
      next: (libro) => {
        this.router.navigate(['/libros/detail', libro.id]).then(() => {
          console.log(libro);
          Swal.fire({
            icon: 'success',
            title: 'Libro actualizado correctamente.',
            text: `Libro ${libro.titulo} ha sido guardado.`,
          });
        });
      },
      error: (err) => {
        this.errors = err.error.errors;
        console.log(this.errors);
      },
    });
  }

  compareArea(area1: Area, area2: Area): boolean {
    if (area1 === undefined && area2 === undefined) {
      return true;
    }
    return area1 == null || area2 == null ? false : area1.id === area2.id;
  }

  compareCategoria(categoria1: Categoria, categoria2: Categoria): boolean {
    if (categoria1 === undefined && categoria2 === undefined) {
      return true;
    }
    return categoria1 == null || categoria2 == null
      ? false
      : categoria1.id === categoria2.id;
  }

  compareEditorial(editorial1: Editorial, editorial2: Editorial): boolean {
    if (editorial1 === undefined && editorial2 === undefined) {
      return true;
    }
    return editorial1 == null || editorial2 == null
      ? false
      : editorial1.id === editorial2.id;
  }

  private _filter(value: string): Observable<Autor[]> {
    const filterValue = value.toLowerCase();
    return this.autorService.getAllByNombreAndApellido(filterValue);
  }

  byNombreOrApellido(autor?: Autor): string {
    return autor ? autor.nombre : '';
  }

  existItem(id: number): boolean {
    let exist = false;
    this.libro.autores.forEach((autor: Autor) => {
      if (id === autor.id) {
        exist = true;
      }
    });
    return exist;
  }

  selectAutor(event: MatAutocompleteSelectedEvent): void {
    let autor = event.option.value as Autor;
    console.log(autor);
    if (!this.existItem(autor.id)) {
      this.libro.autores.push(autor);
      this.autocompleteControl.setValue('');
      event.option.focus();
      event.option.deselect();
    }
  }

  deleteAutor(id: number): void {
    this.libro.autores = this.libro.autores.filter(
      (autor: Autor) => id !== autor.id
    );
  }
}
