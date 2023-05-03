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
import { EjemplaresMaterialesComponent } from './component/ejemplar-material/ejemplares-materiales/ejemplares-materiales.component';
import { EjemplarMaterialCrearComponent } from './component/ejemplar-material/crear/crear.component';
import { EjemplarMaterialFormComponent } from './component/ejemplar-material/form/form.component';
import { EjemplarMaterialDetailComponent } from './component/ejemplar-material/detail/detail.component';
import { LibrosComponent } from './component/libro/libros/libros.component';
import { LibroFormComponent } from './component/libro/form/form.component';
import { LibroDetailComponent } from './component/libro/detail/detail.component';
import { MaterialesComponent } from './component/material/materiales/materiales.component';
import { MaterialFormComponent } from './component/material/form/form.component';
import { MaterialDetailComponent } from './component/material/detail/detail.component';
import { PrestamosLibrosComponent } from './component/prestamo-libro/prestamos-libros/prestamos-libros.component';
import { PrestamoLibroFormComponent } from './component/prestamo-libro/form/form.component';
import { PrestamoLibroDetailComponent } from './component/prestamo-libro/detail/detail.component';
import { PrestamosMaterialesComponent } from './component/prestamo-material/prestamos-materiales/prestamos-materiales.component';
import { PrestamoMaterialFormComponent } from './component/prestamo-material/form/form.component';
import { PrestamoMaterialDetailComponent } from './component/prestamo-material/detail/detail.component';

const routes: Routes = [
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
  { path: 'ejemplares-libros/save', component: EjemplarLibroCrearComponent },
  { path: 'ejemplares-libros/form/:id', component: EjemplarLibroFormComponent },
  { path: 'ejemplares-libros/detail/:id', component: EjemplarLibroDetailComponent },

  { path: 'ejemplares-materiales', component: EjemplaresMaterialesComponent },
  { path: 'ejemplares-materiales/save', component: EjemplarMaterialCrearComponent },
  { path: 'ejemplares-materiales/form/:id', component: EjemplarMaterialFormComponent },
  { path: 'ejemplares-materiales/detail/:id', component: EjemplarMaterialDetailComponent },

  { path: 'libros', component: LibrosComponent },
  { path: 'libros/form', component: LibroFormComponent },
  { path: 'libros/form/:id', component: LibroFormComponent },
  { path: 'libros/detail/:id', component: LibroDetailComponent },

  { path: 'materiales', component: MaterialesComponent },
  { path: 'materiales/form', component: MaterialFormComponent },
  { path: 'materiales/form/:id', component: MaterialFormComponent },
  { path: 'materiales/detail/:id', component: MaterialDetailComponent },

  { path: 'prestamos-libros', component: PrestamosLibrosComponent },
  { path: 'prestamos-libros/form', component: PrestamoLibroFormComponent },
  { path: 'prestamos-libros/detail/:id', component: PrestamoLibroDetailComponent },

  { path: 'prestamos-materiales', component: PrestamosMaterialesComponent },
  { path: 'prestamos-materiales/form', component: PrestamoMaterialFormComponent },
  { path: 'prestamos-materiales/detail/:id', component: PrestamoMaterialDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
