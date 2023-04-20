import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './component/area/areas/areas.component';
import { AreaFormComponent } from './component/area/form/form.component';
import { AreaDetailComponent } from './component/area/detail/detail.component';
import { DocentesComponent } from './component/docente/docentes/docentes.component';
import { DocenteFormComponent } from './component/docente/form/form.component';
import { DocenteDetailComponent } from './component/docente/detail/detail.component';

const routes: Routes = [
  { path: 'areas', component: AreasComponent },
  { path: 'areas/form', component: AreaFormComponent },
  { path: 'areas/form/:id', component: AreaFormComponent },
  { path: 'areas/detail/:id', component: AreaDetailComponent },

  { path: 'docentes', component: DocentesComponent },
  { path: 'docentes/form', component: DocenteFormComponent },
  { path: 'docentes/form/:id', component: DocenteFormComponent },
  { path: 'docentes/detail/:id', component: DocenteDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
