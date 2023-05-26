import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Docente } from 'src/app/core/model/docente.model';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { DocenteService } from 'src/app/service/docente.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-libro-filter-docente',
  templateUrl: './filter-docente.component.html',
  styleUrls: ['./filter-docente.component.css'],
})
export class PrestamoLibroFilterDocenteComponent implements AfterViewInit {
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
  docente: Docente = new Docente();
  dni = '';

  fechasPrestamos = {
    start: '',
    end: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private docenteService: DocenteService,
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
      this.paginationByDocente();
    } else {
      this.paginationByFechaPrestamoAndDocente();
    }
  }

  paginationByDocente(): void {
    this.isLoading = true;
    this.prestamoLibroService
      .paginationByDocente(this.dni, this.currentPage, this.pageSize)
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

  paginationByFechaPrestamoAndDocente(): void {
    this.isLoading = true;
    this.prestamoLibroService
      .paginationByFechaPrestamoAndDocente(
        this.fechasPrestamos.start,
        this.fechasPrestamos.end,
        this.docente.id,
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

  getOneByDni(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.docenteService.getOneByDni(this.dni).subscribe({
      next: (docente) => {
        this.docente = docente;
        Swal.fire({
          icon: 'success',
          title: 'Docente encontrado',
          text: `El docente ${this.docente.nombre} ${this.docente.apellido} ha sido encontrado`,
        });
        this.fechasPrestamos = {
          start: '',
          end: '',
        };
        this.paginationByDocente();
      },
      error: (e) => {
        console.log(e);
        this.dni = '';
        this.docente = new Docente();
        this.dataSource.data = [];
      },
    });
  }

  buscarByFechaPrestamoAndDocente(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.paginationByFechaPrestamoAndDocente()
  }

  exportByDocenteToPdf(): string {
    return this.prestamoLibroService.exportByDocenteToPdf(this.docente.id);
  }

  exportByDocenteToXls(): string {
    return this.prestamoLibroService.exportByDocenteToXls(this.docente.id);
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
