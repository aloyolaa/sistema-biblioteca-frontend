import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-prestamos-materiales',
  templateUrl: './prestamos-materiales.component.html',
  styleUrls: ['./prestamos-materiales.component.css'],
})
export class PrestamosMaterialesComponent implements AfterViewInit, OnInit {
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

  fechasPrestamos = {
    start: '',
    end: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private prestamoMaterialService: PrestamoMaterialService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.pagination();
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pagination();
  }

  pagination(): void {
    this.isLoading = true;
    this.prestamoMaterialService
      .pagination(this.currentPage, this.pageSize)
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

  paginationByFechaPrestamo(): void {
    console.log(this.fechasPrestamos.start);
    console.log(this.fechasPrestamos.end);
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.isLoading = true;
    this.prestamoMaterialService
      .paginationByFechaPrestamo(
        this.fechasPrestamos.start,
        this.fechasPrestamos.end,
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

  cargarTodo(): void {
    this.currentPage = 0;
    this.pagination();
    this.fechasPrestamos.start = '';
    this.fechasPrestamos.end = '';
  }

  exportAllToPdf(): string {
    return this.prestamoMaterialService.exportAllToPdf();
  }

  exportAllToXls(): string {
    return this.prestamoMaterialService.exportAllToXls();
  }
}
