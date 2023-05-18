import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-prestamo-material-filter-descripcion',
  templateUrl: './filter-descripcion.component.html',
  styleUrls: ['./filter-descripcion.component.css'],
})
export class PrestamoMaterialFilterDescripcionComponent
  implements AfterViewInit
{
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
  descripcion = '';

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
      this.paginationByDescripcion();
    } else {
      this.paginationByFechaPrestamoAndDescripcion();
    }
  }

  paginationByDescripcion(): void {
    this.isLoading = true;
    this.prestamoMaterialService
      .paginationByDescripcion(
        this.descripcion,
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

  paginationByFechaPrestamoAndDescripcion(): void {
    this.isLoading = true;
    this.prestamoMaterialService
      .paginationByFechaPrestamoAndDescripcion(
        this.fechasPrestamos.start,
        this.fechasPrestamos.end,
        this.descripcion,
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

  buscarByDescripcion(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.fechasPrestamos = {
      start: '',
      end: '',
    };
    this.paginationByDescripcion();
  }

  buscarByFechaPrestamoAndDescripcion(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.paginationByFechaPrestamoAndDescripcion();
  }
}
