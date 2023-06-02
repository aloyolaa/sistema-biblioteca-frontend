import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/core/model/material.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { MaterialService } from 'src/app/service/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejemplar-material-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class EjemplarMaterialCrearComponent {
  material: Material = new Material();
  codigo = '';
  cantidad = 0;
  errors = {
    numero: '',
    material: '',
  };

  constructor(
    private ejemplarMaterialService: EjemplarMaterialService,
    private materialService: MaterialService,
    private authService: AuthService,
    private router: Router
  ) {}

  limpiar(): void {
    this.material = new Material();
    this.codigo = '';
    this.cantidad = 0;
  }

  getOneByCodigo(): void {
    this.materialService.getOneByCodigo(this.codigo).subscribe((material) => {
      this.material = material;
    });
  }

  save(): void {
    this.ejemplarMaterialService
      .save(this.material.id, this.cantidad)
      .subscribe({
        next: (material) => {
          this.router
            .navigate([this.routerLink() + '/ejemplares-materiales'])
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Ejemplares guardados correctamente.',
                text: `${this.cantidad} ejemplares han sido guardados.`,
              });
            });
        },
        error: (e) => {
          this.errors = e.error.errors;
        },
      });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
