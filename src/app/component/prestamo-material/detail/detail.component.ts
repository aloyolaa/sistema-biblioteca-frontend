import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { AuthService } from 'src/app/service/auth.service';
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
  dataSource: MatTableDataSource<EjemplarMaterial> = new MatTableDataSource();

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
          this.dataSource.data = this.prestamo.ejemplares;
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
                this.router.navigate([
                  this.routerLink() + '/prestamos-materiales',
                ]);
              }
            });
        }
      });
  }

  exportByPrestamoMaterialToPdf(): void {
    this.prestamoMaterialService
      .exportByPrestamoMaterialToPdf(this.prestamo.id)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportByPrestamoMaterialToXls(): void {
    this.prestamoMaterialService
      .exportByPrestamoMaterialToXls(this.prestamo.id)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/vnd.ms-excel' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
