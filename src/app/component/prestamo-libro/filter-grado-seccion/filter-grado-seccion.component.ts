import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';

@Component({
  selector: 'app-prestamo-libro-filter-grado-seccion',
  templateUrl: './filter-grado-seccion.component.html',
  styleUrls: ['./filter-grado-seccion.component.css'],
})
export class PrestamoLibroFilterGradoSeccionComponent implements AfterViewInit {
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
  grado = 0;
  seccion = '';

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
    this.prestamoLibroService
      .paginationByGradoAndSeccion(
        this.grado,
        this.seccion,
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

  paginationByFechaPrestamoAndGradoAndSeccion(): void {
    this.isLoading = true;
    this.prestamoLibroService
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

  buscarByGradoAndSeccion(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.fechasPrestamos = {
      start: '',
      end: '',
    };
    this.paginationByGradoAndSeccion();
  }

  buscarByFechaPrestamoAndGradoAndSeccion(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.paginationByFechaPrestamoAndGradoAndSeccion();
  }

  exportByGradoAndSeccionToPdf(): void {
    this.prestamoLibroService
      .exportByGradoAndSeccionToPdf(this.grado, this.seccion)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportByGradoAndSeccionToXls(): void {
    this.prestamoLibroService
      .exportByGradoAndSeccionToXls(this.grado, this.seccion)
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
