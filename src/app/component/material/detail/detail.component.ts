import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Material } from 'src/app/core/model/material.model';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class MaterialDetailComponent {
  material: Material = new Material();
  ejemplares = 0;
  ejemplaresDisponibles = 0;

  constructor(
    private materialService: MaterialService,
    private ejemplarMaterialService: EjemplarMaterialService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('id'));
      if (id) {
        this.materialService.getOne(id).subscribe((material) => {
          this.material = material;
          this.countByMaterial(this.material.codigo);
          this.countByMaterialAndEstado(this.material.codigo);
        });
      }
    });
  }

  countByMaterial(codigo: string): void {
    this.ejemplarMaterialService.countByMaterial(codigo).subscribe((e) => {
      console.log(e);
      this.ejemplares = e;
      console.log(this.ejemplares);
    });
  }

  countByMaterialAndEstado(codigo: string): void {
    this.ejemplarMaterialService
      .countByMaterialAndEstado(codigo)
      .subscribe((e) => {
        console.log(e);
        this.ejemplaresDisponibles = e;
        console.log(this.ejemplaresDisponibles);
      });
  }
}
