import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';

@Component({
  selector: 'app-prestamo-libro-filter-descripcion',
  templateUrl: './filter-descripcion.component.html',
  styleUrls: ['./filter-descripcion.component.css'],
})
export class PrestamoLibroFilterDescripcionComponent implements AfterViewInit {
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
  dataSource: MatTableDataSource<PrestamoLibro> = new MatTableDataSource();

  prestamos: PrestamoLibro[] = [];
  descripcion = '';

  fechasPrestamos = {
    start: '',
    end: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private prestamoLibroService: PrestamoLibroService) {}

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
    this.prestamoLibroService
      .paginationByDescripcion(
        this.descripcion,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as PrestamoLibro[];
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
    this.prestamoLibroService
      .paginationByFechaPrestamoAndDescripcion(
        this.fechasPrestamos.start,
        this.fechasPrestamos.end,
        this.descripcion,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as PrestamoLibro[];
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
    this.paginationByDescripcion();
  }

  buscarByFechaPrestamoAndDescripcion(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.paginationByFechaPrestamoAndDescripcion();
  }
}