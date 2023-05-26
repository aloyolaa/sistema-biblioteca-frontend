import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { AuthService } from 'src/app/service/auth.service';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-material-cerrar',
  templateUrl: './cerrar.component.html',
  styleUrls: ['./cerrar.component.css'],
})
export class PrestamoMaterialCerrarComponent implements OnInit {
  prestamo: PrestamoMaterial = new PrestamoMaterial();

  constructor(
    private prestamoMaterialService: PrestamoMaterialService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.prestamoMaterialService.getOne(id).subscribe((prestamo) => {
          this.prestamo = prestamo;
        });
      }
    });
  }

  close(): void {
    this.prestamoMaterialService.close(this.prestamo).subscribe({
      next: (prestamo) => {
        this.router
          .navigate([
            this.routerLink() + '/prestamos-materiales/detail',
            prestamo.id,
          ])
          .then(() => {
            console.log(prestamo);
            Swal.fire({
              icon: 'success',
              title: 'Préstamo cerrado correctamente.',
              text: `Préstamo de Materiales ${prestamo.id} ha sido cerrado.`,
            });
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
