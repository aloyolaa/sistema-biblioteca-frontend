import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-material-cerrar',
  templateUrl: './cerrar.component.html',
  styleUrls: ['./cerrar.component.css'],
})
export class PrestamoMaterialCerrarComponent {
  prestamo: PrestamoMaterial = new PrestamoMaterial();

  constructor(
    private prestamoMaterialService: PrestamoMaterialService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('id'));
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
          .navigate(['/prestamos-materiales/detail', prestamo.id])
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
}
