import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePrestamoMaterial } from 'src/app/core/model/detalle-prestamo-material.model';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-material-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class PrestamoMaterialDetailComponent implements OnInit {
  prestamo: PrestamoMaterial = new PrestamoMaterial();

  columnas: string[] = ['codigo', 'nombre', 'estado'];
  dataSource: MatTableDataSource<DetallePrestamoMaterial> =
    new MatTableDataSource();

  constructor(
    private prestamoMaterialService: PrestamoMaterialService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.prestamoMaterialService.getOne(id).subscribe((prestamo) => {
          this.prestamo = prestamo;
          this.dataSource.data = this.prestamo.detalle;
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

  exportByPrestamoMaterialToPdf(): string {
    return this.prestamoMaterialService.exportByPrestamoMaterialToPdf(
      this.prestamo.id
    );
  }

  exportByPrestamoMaterialToXls(): string {
    return this.prestamoMaterialService.exportByPrestamoMaterialToXls(
      this.prestamo.id
    );
  }
}
