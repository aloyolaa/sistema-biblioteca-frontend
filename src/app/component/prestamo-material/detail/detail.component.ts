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
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el préstamo ${this.prestamo.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.prestamoMaterialService.delete(prestamo.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Préstamo Eliminado',
            text: `Préstamo ${prestamo.id} eliminado con éxito.`,
          });
          this.router.navigate([this.routerLink() + '/prestamos-materiales']);
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
