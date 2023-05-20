import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';

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

import { NavbarComponent } from './component/navbar/navbar/navbar.component';
import { SignupComponent } from './component/signup/signup/signup.component';
import { LoginComponent } from './component/login/login/login.component';
import { HomeComponent } from './component/home/home/home.component';
import { SidebarComponent } from './component/sidebar/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    
    AreasComponent,
    AreaFormComponent,
    AreaDetailComponent,

    AutoresComponent,
    AutorFormComponent,
    AutorDetailComponent,
    
    CategoriasComponent,
    CategoriaFormComponent,
    CategoriaDetailComponent,
    
    DocentesComponent,
    DocenteFormComponent,
    DocenteDetailComponent,
    
    EditorialesComponent,
    EditorialFormComponent,
    EditorialDetailComponent,

    EjemplaresLibrosComponent,
    EjemplarLibroFormComponent,
    EjemplarLibroDetailComponent,
    EjemplarLibroCrearComponent,
    EjemplarLibroFilterLibroComponent,

    EjemplaresMaterialesComponent,
    EjemplarMaterialFormComponent,
    EjemplarMaterialDetailComponent,
    EjemplarMaterialCrearComponent,
    EjemplarMaterialFilterMaterialComponent,

    LibrosComponent,
    LibroFormComponent,
    LibroDetailComponent,
    LibroFilterAreaComponent,
    LibroFilterCategoriaComponent,
    LibroFilterEditorialComponent,
    LibroFilterAutorComponent,

    MaterialesComponent,
    MaterialFormComponent,
    MaterialDetailComponent,
    MaterialFilterAreaComponent,

    PrestamosLibrosComponent,
    PrestamoLibroFormComponent,
    PrestamoLibroDetailComponent,
    PrestamoLibroCerrarComponent,
    PrestamoLibroFilterDocenteComponent,
    PrestamoLibroFilterGradoSeccionComponent,
    PrestamoLibroFilterDescripcionComponent,

    PrestamosMaterialesComponent,
    PrestamoMaterialFormComponent,
    PrestamoMaterialDetailComponent,
    PrestamoMaterialCerrarComponent,
    PrestamoMaterialFilterDocenteComponent,
    PrestamoMaterialFilterGradoSeccionComponent,
    PrestamoMaterialFilterDescripcionComponent,

    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
