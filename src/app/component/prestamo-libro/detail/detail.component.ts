import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-prestamo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class PrestamoLibroDetailComponent implements OnInit {
  prestamo: PrestamoLibro = new PrestamoLibro();

  columnas: string[] = ['codigo', 'titulo', 'estado'];
  dataSource: MatTableDataSource<EjemplarLibro> = new MatTableDataSource();

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.prestamoLibroService.getOne(id).subscribe((prestamo) => {
          this.prestamo = prestamo;
          this.dataSource.data = this.prestamo.ejemplares;
        });
      }
    });
  }

  delete(prestamo: PrestamoLibro): void {
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
        this.prestamoLibroService.delete(prestamo.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Préstamo Eliminado',
            text: `Préstamo ${prestamo.id} eliminado con éxito.`,
          });
          this.router.navigate([this.routerLink() + '/prestamos-libros']);
        });
      }
    });
  }

  exportByPrestamoLibroToPdf(): void {
    this.prestamoLibroService
      .exportByPrestamoLibroToPdf(this.prestamo.id)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportByPrestamoLibroToXls(): void {
    this.prestamoLibroService
      .exportByPrestamoLibroToXls(this.prestamo.id)
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
