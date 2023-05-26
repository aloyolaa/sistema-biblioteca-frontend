import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';

@Component({
  selector: 'app-prestamos-libros',
  templateUrl: './prestamos-libros.component.html',
  styleUrls: ['./prestamos-libros.component.css'],
})
export class PrestamosLibrosComponent implements AfterViewInit, OnInit {
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

  fechasPrestamos = {
    start: '',
    end: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private authService: AuthService
  ) {}

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
    if (this.fechasPrestamos.start == '' && this.fechasPrestamos.end == '') {
      this.pagination();
    } else {
      this.paginationByFechaPrestamo();
    }
  }

  pagination(): void {
    this.isLoading = true;
    this.prestamoLibroService
      .pagination(this.currentPage, this.pageSize)
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

  paginationByFechaPrestamo(): void {
    console.log(this.fechasPrestamos.start);
    console.log(this.fechasPrestamos.end);
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.isLoading = true;
    this.prestamoLibroService
      .paginationByFechaPrestamo(
        this.fechasPrestamos.start,
        this.fechasPrestamos.end,
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

  cargarTodo(): void {
    this.currentPage = 0;
    this.pagination();
    this.fechasPrestamos.start = '';
    this.fechasPrestamos.end = '';
  }

  exportAllToPdf(): string {
    return this.prestamoLibroService.exportAllToPdf();
  }

  exportAllToXls(): string {
    return this.prestamoLibroService.exportAllToXls();
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
