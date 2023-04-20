import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './component/area/areas/areas.component';
import { AreaFormComponent } from './component/area/form/area-form.component';

const routes: Routes = [
  { path: 'areas', component: AreasComponent },
  { path: 'areas/form', component: AreaFormComponent },
  { path: 'areas/form/:id', component: AreaFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
