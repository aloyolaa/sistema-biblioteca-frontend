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
import { EjemplarLibroCrearComponent } from './component/ejemplar-libro/crear/crear.component';
import { EjemplarLibroDetailComponent } from './component/ejemplar-libro/detail/detail.component';
import { EjemplarLibroFormComponent } from './component/ejemplar-libro/form/form.component';
import { EjemplaresLibrosComponent } from './component/ejemplar-libro/ejemplares-libros/ejemplares-libros.component';
import { EjemplarMaterialCrearComponent } from './component/ejemplar-material/crear/crear.component';
import { EjemplarMaterialDetailComponent } from './component/ejemplar-material/detail/detail.component';
import { EjemplarMaterialFormComponent } from './component/ejemplar-material/form/form.component';
import { EjemplaresMaterialesComponent } from './component/ejemplar-material/ejemplares-materiales/ejemplares-materiales.component';
import { LibrosComponent } from './component/libro/libros/libros.component';
import { LibroFormComponent } from './component/libro/form/form.component';
import { LibroDetailComponent } from './component/libro/detail/detail.component';
import { MaterialDetailComponent } from './component/material/detail/detail.component';
import { MaterialFormComponent } from './component/material/form/form.component';
import { MaterialesComponent } from './component/material/materiales/materiales.component';

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
    EjemplarLibroCrearComponent,
    EjemplarLibroDetailComponent,
    EjemplarLibroFormComponent,
    EjemplaresLibrosComponent,
    EjemplarMaterialCrearComponent,
    EjemplarMaterialDetailComponent,
    EjemplarMaterialFormComponent,
    EjemplaresMaterialesComponent,
    LibrosComponent,
    LibroFormComponent,
    LibroDetailComponent,
    MaterialesComponent,
    MaterialFormComponent,
    MaterialDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
