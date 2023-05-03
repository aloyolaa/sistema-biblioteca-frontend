import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-material-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class PrestamoMaterialDetailComponent implements OnInit {
  title = 'Detalle del Préstamo';
  prestamo: PrestamoMaterial = new PrestamoMaterial();
  ejemplares = 0;
  ejemplaresDisponibles = 0;

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

  delete(prestamo: PrestamoMaterial): void {
    const withBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    withBootstrapButtons
      .fire({
        title: '¿Esta seguro de eliminar este préstamo',
        text: `El préstamo se eliminará?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, elimínalo',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.prestamoMaterialService
            .delete(prestamo.id)
            .subscribe((response) => {
              console.log(response);
              if (response) {
                withBootstrapButtons.fire(
                  'Préstamo eliminado satisfactoriamente',
                  `Préstamo ${prestamo.id} eliminado.`,
                  'success'
                );
                this.router.navigate(['/prestamos-materiales']);
              }
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
              text: `Préstamo ${prestamo.id} ha sido cerrado.`,
            });
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
