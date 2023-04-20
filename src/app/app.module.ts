import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { EjemplaresComponent } from './component/ejemplar/ejemplares/ejemplares.component';
import { EjemplarFormComponent } from './component/ejemplar/form/form.component';
import { EjemplarDetailComponent } from './component/ejemplar/detail/detail.component';
import { EjemplarCrearComponent } from './component/ejemplar/crear/crear.component';
import { LibrosComponent } from './component/libro/libros/libros.component';
import { LibroFormComponent } from './component/libro/form/form.component';
import { LibroDetailComponent } from './component/libro/detail/detail.component';

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
    EjemplaresComponent,
    EjemplarFormComponent,
    EjemplarDetailComponent,
    EjemplarCrearComponent,
    LibrosComponent,
    LibroFormComponent,
    LibroDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
