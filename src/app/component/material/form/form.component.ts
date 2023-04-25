import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/core/model/area.model';
import { Material } from 'src/app/core/model/material.model';
import { AreaService } from 'src/app/service/area.service';
import { MaterialService } from 'src/app/service/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class MaterialFormComponent implements OnInit {
  title = 'Formulario de Material';
  material: Material = new Material();
  areas: Area[] = [];
  errors = {
    codigo: '',
    nombre: '',
    medidas: '',
    area: '',
  };

  constructor(
    private materialService: MaterialService,
    private areaService: AreaService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeMaterial();
  }

  chargeMaterial(): void {
    this.activedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.materialService
          .getOne(id)
          .subscribe((material) => (this.material = material));
      }
    });
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  save(): void {
    this.materialService.save(this.material).subscribe({
      next: (material) => {
        this.router.navigate(['/materiales/detail', material.id]).then(() => {
          console.log(material);
          Swal.fire({
            icon: 'success',
            title: 'Material guardado correctamente.',
            text: `Material ${material.nombre} ha sido guardado.`,
          });
        });
      },
      error: (e) => {
        this.errors = e.error.errors;
        console.log(this.errors);
      },
    });
  }

  update(): void {
    this.materialService.update(this.material).subscribe({
      next: (material) => {
        this.router.navigate(['/materiales/detail', material.id]).then(() => {
          console.log(material);
          Swal.fire({
            icon: 'success',
            title: 'Material actualizado correctamente.',
            text: `Material ${material.nombre} ha sido guardado.`,
          });
        });
      },
      error: (err) => {
        this.errors = err.error.errors;
        console.log(this.errors);
      },
    });
  }

  compareArea(area1: Area, area2: Area): boolean {
    if (area1 === undefined && area2 === undefined) {
      return true;
    }
    return area1 == null || area2 == null ? false : area1.id === area2.id;
  }
}
