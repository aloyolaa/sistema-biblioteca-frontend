import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';
import { LibroService } from 'src/app/service/libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejemplar-libro-filter-libro',
  templateUrl: './filter-libro.component.html',
  styleUrls: ['./filter-libro.component.css'],
})
export class EjemplarLibroFilterLibroComponent implements AfterViewInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'estado', 'detalle'];
  dataSource: MatTableDataSource<EjemplarLibro> = new MatTableDataSource();

  libro: Libro = new Libro();
  codigo = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ejemplarLibroService: EjemplarLibroService,
    private libroService: LibroService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginationByLibro();
  }

  paginationByLibro(): void {
    this.isLoading = true;
    this.ejemplarLibroService
      .paginationByLibro(this.codigo, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as EjemplarLibro[];
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

  getOneByCodigo(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    this.libroService.getOneByCodigo(this.codigo).subscribe({
      next: (libro) => {
        this.libro = libro;
        Swal.fire({
          icon: 'success',
          title: 'Libro encontrado',
          text: `El libro ${this.libro.titulo} ha sido encontrado`,
        });
        this.paginationByLibro();
      },
      error: (e) => {
        console.log(e);
        this.codigo = '';
        this.libro = new Libro();
        this.dataSource.data = [];
      },
    });
  }

  exportByLibroToPdf(): string {
    return this.ejemplarLibroService.exportByLibroToPdf(this.libro.id);
  }

  exportByLibroToXls(): string {
    return this.ejemplarLibroService.exportByLibroToXls(this.libro.id);
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
