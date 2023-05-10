import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreasComponent } from './component/area/areas/areas.component';
import { AreaFormComponent } from './component/area/form/form.component';
import { AreaDetailComponent } from './component/area/detail/detail.component';

import { AutoresComponent } from './component/autor/autores/autores.component';
import { AutorFormComponent } from './component/autor/form/form.component';
import { AutorDetailComponent } from './component/autor/detail/detail.component';

import { CategoriasComponent } from './component/categoria/categorias/categorias.component';
import { CategoriaFormComponent } from './component/categoria/form/form.component';
import { CategoriaDetailComponent } from './component/categoria/detail/detail.component';

import { DocentesComponent } from './component/docente/docentes/docentes.component';
import { DocenteFormComponent } from './component/docente/form/form.component';
import { DocenteDetailComponent } from './component/docente/detail/detail.component';

import { EditorialesComponent } from './component/editorial/editoriales/editoriales.component';
import { EditorialFormComponent } from './component/editorial/form/form.component';
import { EditorialDetailComponent } from './component/editorial/detail/detail.component';

import { EjemplaresLibrosComponent } from './component/ejemplar-libro/ejemplares-libros/ejemplares-libros.component';
import { EjemplarLibroFormComponent } from './component/ejemplar-libro/form/form.component';
import { EjemplarLibroDetailComponent } from './component/ejemplar-libro/detail/detail.component';
import { EjemplarLibroCrearComponent } from './component/ejemplar-libro/crear/crear.component';
import { EjemplarLibroFilterLibroComponent } from './component/ejemplar-libro/filter-libro/filter-libro.component';

import { EjemplaresMaterialesComponent } from './component/ejemplar-material/ejemplares-materiales/ejemplares-materiales.component';
import { EjemplarMaterialFormComponent } from './component/ejemplar-material/form/form.component';
import { EjemplarMaterialDetailComponent } from './component/ejemplar-material/detail/detail.component';
import { EjemplarMaterialCrearComponent } from './component/ejemplar-material/crear/crear.component';
import { EjemplarMaterialFilterMaterialComponent } from './component/ejemplar-material/filter-material/filter-material.component';

import { LibrosComponent } from './component/libro/libros/libros.component';
import { LibroFormComponent } from './component/libro/form/form.component';
import { LibroDetailComponent } from './component/libro/detail/detail.component';
import { LibroFilterAreaComponent } from './component/libro/filter-area/filter-area.component';
import { LibroFilterCategoriaComponent } from './component/libro/filter-categoria/filter-categoria.component';
import { LibroFilterEditorialComponent } from './component/libro/filter-editorial/filter-editorial.component';
import { LibroFilterAutorComponent } from './component/libro/filter-autor/filter-autor.component';

import { MaterialesComponent } from './component/material/materiales/materiales.component';
import { MaterialFormComponent } from './component/material/form/form.component';
import { MaterialDetailComponent } from './component/material/detail/detail.component';
import { MaterialFilterAreaComponent } from './component/material/filter-area/filter-area.component';

import { PrestamosLibrosComponent } from './component/prestamo-libro/prestamos-libros/prestamos-libros.component';
import { PrestamoLibroFormComponent } from './component/prestamo-libro/form/form.component';
import { PrestamoLibroDetailComponent } from './component/prestamo-libro/detail/detail.component';
import { PrestamoLibroCerrarComponent } from './component/prestamo-libro/cerrar/cerrar.component';
import { PrestamoLibroFilterDocenteComponent } from './component/prestamo-libro/filter-docente/filter-docente.component';
import { PrestamoLibroFilterGradoSeccionComponent } from './component/prestamo-libro/filter-grado-seccion/filter-grado-seccion.component';

import { PrestamosMaterialesComponent } from './component/prestamo-material/prestamos-materiales/prestamos-materiales.component';
import { PrestamoMaterialFormComponent } from './component/prestamo-material/form/form.component';
import { PrestamoMaterialDetailComponent } from './component/prestamo-material/detail/detail.component';
import { PrestamoMaterialCerrarComponent } from './component/prestamo-material/cerrar/cerrar.component';
import { PrestamoMaterialFilterDocenteComponent } from './component/prestamo-material/filter-docente/filter-docente.component';
import { PrestamoMaterialFilterGradoSeccionComponent } from './component/prestamo-material/filter-grado-seccion/filter-grado-seccion.component';
import { HomeComponent } from './component/home/home/home.component';
import { SignupComponent } from './component/signup/signup/signup.component';
import { LoginComponent } from './component/login/login/login.component';

const routes: Routes = [
  { path : '', component: HomeComponent, pathMatch : 'full'},
  { path : 'signup', component : SignupComponent, pathMatch : 'full'},
  { path : 'login', component : LoginComponent, pathMatch : 'full'
  },

  { path: 'areas', component: AreasComponent },
  { path: 'areas/form', component: AreaFormComponent },
  { path: 'areas/form/:id', component: AreaFormComponent },
  { path: 'areas/detail/:id', component: AreaDetailComponent },

  { path: 'autores', component: AutoresComponent },
  { path: 'autores/form', component: AutorFormComponent },
  { path: 'autores/form/:id', component: AutorFormComponent },
  { path: 'autores/detail/:id', component: AutorDetailComponent },

  { path: 'categorias', component: CategoriasComponent },
  { path: 'categorias/form', component: CategoriaFormComponent },
  { path: 'categorias/form/:id', component: CategoriaFormComponent },
  { path: 'categorias/detail/:id', component: CategoriaDetailComponent },

  { path: 'docentes', component: DocentesComponent },
  { path: 'docentes/form', component: DocenteFormComponent },
  { path: 'docentes/form/:id', component: DocenteFormComponent },
  { path: 'docentes/detail/:id', component: DocenteDetailComponent },

  { path: 'editoriales', component: EditorialesComponent },
  { path: 'editoriales/form', component: EditorialFormComponent },
  { path: 'editoriales/form/:id', component: EditorialFormComponent },
  { path: 'editoriales/detail/:id', component: EditorialDetailComponent },

  { path: 'ejemplares-libros', component: EjemplaresLibrosComponent },
  { path: 'ejemplares-libros/form/:id', component: EjemplarLibroFormComponent },
  { path: 'ejemplares-libros/detail/:id', component: EjemplarLibroDetailComponent },
  { path: 'ejemplares-libros/save', component: EjemplarLibroCrearComponent },
  { path: 'ejemplares-libros/filter/libro', component: EjemplarLibroFilterLibroComponent },

  { path: 'ejemplares-materiales', component: EjemplaresMaterialesComponent },
  { path: 'ejemplares-materiales/form/:id', component: EjemplarMaterialFormComponent },
  { path: 'ejemplares-materiales/detail/:id', component: EjemplarMaterialDetailComponent },
  { path: 'ejemplares-materiales/save', component: EjemplarMaterialCrearComponent },
  { path: 'ejemplares-materiales/filter/material', component: EjemplarMaterialFilterMaterialComponent },

  { path: 'libros', component: LibrosComponent },
  { path: 'libros/form', component: LibroFormComponent },
  { path: 'libros/form/:id', component: LibroFormComponent },
  { path: 'libros/detail/:id', component: LibroDetailComponent },
  { path: 'libros/filter/area', component: LibroFilterAreaComponent },
  { path: 'libros/filter/categoria', component: LibroFilterCategoriaComponent },
  { path: 'libros/filter/editorial', component: LibroFilterEditorialComponent },
  { path: 'libros/filter/autor', component: LibroFilterAutorComponent },

  { path: 'materiales', component: MaterialesComponent },
  { path: 'materiales/form', component: MaterialFormComponent },
  { path: 'materiales/form/:id', component: MaterialFormComponent },
  { path: 'materiales/detail/:id', component: MaterialDetailComponent },
  { path: 'materiales/filter/area', component: MaterialFilterAreaComponent },

  { path: 'prestamos-libros', component: PrestamosLibrosComponent },
  { path: 'prestamos-libros/form', component: PrestamoLibroFormComponent },
  { path: 'prestamos-libros/detail/:id', component: PrestamoLibroDetailComponent },
  { path: 'prestamos-libros/cerrar/:id', component: PrestamoLibroCerrarComponent },
  { path: 'prestamos-libros/filter/docente', component: PrestamoLibroFilterDocenteComponent },
  { path: 'prestamos-libros/filter/grado-seccion', component: PrestamoLibroFilterGradoSeccionComponent },

  { path: 'prestamos-materiales', component: PrestamosMaterialesComponent },
  { path: 'prestamos-materiales/form', component: PrestamoMaterialFormComponent },
  { path: 'prestamos-materiales/detail/:id', component: PrestamoMaterialDetailComponent },
  { path: 'prestamos-materiales/cerrar/:id', component: PrestamoMaterialCerrarComponent },
  { path: 'prestamos-materiales/filter/docente', component: PrestamoMaterialFilterDocenteComponent },
  { path: 'prestamos-materiales/filter/grado-seccion', component: PrestamoMaterialFilterGradoSeccionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
