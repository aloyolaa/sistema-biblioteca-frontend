import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Material } from 'src/app/core/model/material.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class MaterialDetailComponent implements OnInit {
  material: Material = new Material();
  ejemplares = 0;
  ejemplaresDisponibles = 0;

  constructor(
    private materialService: MaterialService,
    private ejemplarMaterialService: EjemplarMaterialService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
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

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
