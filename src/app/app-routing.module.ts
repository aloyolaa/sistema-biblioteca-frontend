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
import { PrestamoLibroFilterDescripcionComponent } from './component/prestamo-libro/filter-descripcion/filter-descripcion.component';

import { PrestamosMaterialesComponent } from './component/prestamo-material/prestamos-materiales/prestamos-materiales.component';
import { PrestamoMaterialFormComponent } from './component/prestamo-material/form/form.component';
import { PrestamoMaterialDetailComponent } from './component/prestamo-material/detail/detail.component';
import { PrestamoMaterialCerrarComponent } from './component/prestamo-material/cerrar/cerrar.component';
import { PrestamoMaterialFilterDocenteComponent } from './component/prestamo-material/filter-docente/filter-docente.component';
import { PrestamoMaterialFilterGradoSeccionComponent } from './component/prestamo-material/filter-grado-seccion/filter-grado-seccion.component';
import { PrestamoMaterialFilterDescripcionComponent } from './component/prestamo-material/filter-descripcion/filter-descripcion.component';

import { UsuariosComponent } from './component/usuario/usuarios/usuarios.component';
import { UsuarioFormComponent } from './component/usuario/form/form.component';
import { UsuarioDetailComponent } from './component/usuario/detail/detail.component';

import { HomeComponent } from './component/home/home/home.component';
import { LoginComponent } from './component/login/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  {
    path: 'areas',
    component: AreasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'areas/form',
    component: AreaFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'areas/form/:id',
    component: AreaFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'areas/detail/:id',
    component: AreaDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'autores',
    component: AutoresComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'autores/form',
    component: AutorFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'autores/form/:id',
    component: AutorFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'autores/detail/:id',
    component: AutorDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'categorias/form',
    component: CategoriaFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'categorias/form/:id',
    component: CategoriaFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'categorias/detail/:id',
    component: CategoriaDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'docentes',
    component: DocentesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'docentes/form',
    component: DocenteFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'docentes/form/:id',
    component: DocenteFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'docentes/detail/:id',
    component: DocenteDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'editoriales',
    component: EditorialesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'editoriales/form',
    component: EditorialFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'editoriales/form/:id',
    component: EditorialFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'editoriales/detail/:id',
    component: EditorialDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'ejemplares-libros',
    component: EjemplaresLibrosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-libros/form/:id',
    component: EjemplarLibroFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-libros/detail/:id',
    component: EjemplarLibroDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-libros/save',
    component: EjemplarLibroCrearComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-libros/filter/libro',
    component: EjemplarLibroFilterLibroComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'ejemplares-materiales',
    component: EjemplaresMaterialesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-materiales/form/:id',
    component: EjemplarMaterialFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-materiales/detail/:id',
    component: EjemplarMaterialDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-materiales/save',
    component: EjemplarMaterialCrearComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'ejemplares-materiales/filter/material',
    component: EjemplarMaterialFilterMaterialComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'libros',
    component: LibrosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'libros/form',
    component: LibroFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'libros/form/:id',
    component: LibroFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'libros/detail/:id',
    component: LibroDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'libros/filter/area',
    component: LibroFilterAreaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'libros/filter/categoria',
    component: LibroFilterCategoriaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'libros/filter/editorial',
    component: LibroFilterEditorialComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'libros/filter/autor',
    component: LibroFilterAutorComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'materiales',
    component: MaterialesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'materiales/form',
    component: MaterialFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'materiales/form/:id',
    component: MaterialFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'materiales/detail/:id',
    component: MaterialDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'materiales/filter/area',
    component: MaterialFilterAreaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'prestamos-libros',
    component: PrestamosLibrosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-libros/form',
    component: PrestamoLibroFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-libros/detail/:id',
    component: PrestamoLibroDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-libros/cerrar/:id',
    component: PrestamoLibroCerrarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-libros/filter/docente',
    component: PrestamoLibroFilterDocenteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-libros/filter/grado-seccion',
    component: PrestamoLibroFilterGradoSeccionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-libros/filter/descripcion',
    component: PrestamoLibroFilterDescripcionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'prestamos-materiales',
    component: PrestamosMaterialesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-materiales/form',
    component: PrestamoMaterialFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-materiales/detail/:id',
    component: PrestamoMaterialDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-materiales/cerrar/:id',
    component: PrestamoMaterialCerrarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-materiales/filter/docente',
    component: PrestamoMaterialFilterDocenteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-materiales/filter/grado-seccion',
    component: PrestamoMaterialFilterGradoSeccionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'prestamos-materiales/filter/descripcion',
    component: PrestamoMaterialFilterDescripcionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'usuarios',
    component: UsuariosComponent,
    
  },
  {
    path: 'usuarios/form',
    component: UsuarioFormComponent,
    
  },
  {
    path: 'usuarios/form/:id',
    component: UsuarioFormComponent,
    
  },
  {
    path: 'usuarios/detail/:id',
    component: UsuarioDetailComponent,
  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
