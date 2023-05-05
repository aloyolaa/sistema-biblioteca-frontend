import { Component } from '@angular/core';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { Material } from 'src/app/core/model/material.model';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-ejemplar-material-filter-material',
  templateUrl: './filter-material.component.html',
  styleUrls: ['./filter-material.component.css'],
})
export class EjemplarMaterialFilterMaterialComponent {
  title = 'Ejemplares de Materiales';
  ejemplares: EjemplarMaterial[] = [];
  material: Material = new Material();
  codigo: string = '';
  page = 1;

  constructor(
    private ejemplarMaterialService: EjemplarMaterialService,
    private materialService: MaterialService
  ) {}

  paginationByMaterial(): void {
    this.ejemplarMaterialService
      .paginationByMaterial(this.codigo, this.page - 1)
      .subscribe(
        (response) => (this.ejemplares = response.content as EjemplarMaterial[])
      );
  }

  getOneByCodigo(): void {
    this.materialService
      .getOneByCodigo(this.codigo)
      .subscribe((material) => (this.material = material));
  }
}
