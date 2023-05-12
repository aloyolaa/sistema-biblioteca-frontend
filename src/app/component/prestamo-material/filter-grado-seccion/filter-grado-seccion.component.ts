import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-prestamo-material-filter-grado-seccion',
  templateUrl: './filter-grado-seccion.component.html',
  styleUrls: ['./filter-grado-seccion.component.css'],
})
export class PrestamoMaterialFilterGradoSeccionComponent {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = [
    'id',
    'descripcion',
    'grado-seccion',
    'estado',
    'fecha_prestamo',
    'detalle',
  ];
  dataSource: MatTableDataSource<PrestamoMaterial> = new MatTableDataSource();

  prestamos: PrestamoMaterial[] = [];
  grado = 0;
  seccion = '';

  fechasPrestamos = {
    start: '',
    end: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private prestamoMaterialService: PrestamoMaterialService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    if (this.fechasPrestamos.start == '' && this.fechasPrestamos.end == '') {
      this.paginationByGradoAndSeccion();
    } else {
      this.paginationByFechaPrestamoAndGradoAndSeccion();
    }
  }

  paginationByGradoAndSeccion(): void {
    this.isLoading = true;
    this.prestamoMaterialService
      .paginationByGradoAndSeccion(
        this.grado,
        this.seccion,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as PrestamoMaterial[];
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.totalElements;
          });
          this.isLoading = false;
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  paginationByFechaPrestamoAndGradoAndSeccion(): void {
    this.isLoading = true;
    this.prestamoMaterialService
      .paginationByFechaPrestamoAndGradoAndSeccion(
        this.fechasPrestamos.start,
        this.fechasPrestamos.end,
        this.grado,
        this.seccion,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as PrestamoMaterial[];
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.totalElements;
          });
          this.isLoading = false;
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  buscarByGradoAndSeccion(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.paginationByGradoAndSeccion();
  }

  buscarByFechaPrestamoAndGradoAndSeccion(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.paginationByFechaPrestamoAndGradoAndSeccion();
  }
}
