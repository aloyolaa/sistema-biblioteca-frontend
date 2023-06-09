import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/core/model/area.model';
import { Material } from 'src/app/core/model/material.model';
import { AreaService } from 'src/app/service/area.service';
import { AuthService } from 'src/app/service/auth.service';
import { MaterialService } from 'src/app/service/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class MaterialFormComponent implements OnInit {
  material: Material = new Material();
  areas: Area[] = [];
  errors = {
    codigo: '',
    nombre: '',
    area: '',
  };

  constructor(
    private materialService: MaterialService,
    private areaService: AreaService,
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeMaterial();
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  chargeMaterial(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.materialService
          .getOne(id)
          .subscribe((material) => (this.material = material));
      }
    });
  }

  limpiar(): void {
    this.errors = {
      codigo: '',
      nombre: '',
      area: '',
    };
  }

  save(): void {
    this.materialService.save(this.material).subscribe({
      next: (material) => {
        this.router
          .navigate([this.routerLink() + '/materiales/detail', material.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Material guardado correctamente.',
              text: `Material ${material.nombre} ha sido guardado.`,
            });
          });
      },
      error: (e) => {
        this.errors = e.error.errors;
      },
    });
  }

  update(): void {
    this.materialService.update(this.material).subscribe({
      next: (material) => {
        this.router
          .navigate([this.routerLink() + '/materiales/detail', material.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Material actualizado correctamente.',
              text: `Material ${material.nombre} ha sido guardado.`,
            });
          });
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
    });
  }

  compareArea(area1: Area, area2: Area): boolean {
    if (area1 === undefined && area2 === undefined) {
      return true;
    }
    return area1 == null || area2 == null ? false : area1.id === area2.id;
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
