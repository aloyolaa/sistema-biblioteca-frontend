import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/core/model/libro.model';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'titulo', 'detalle'];
  dataSource: MatTableDataSource<Libro> = new MatTableDataSource();

  buscar = '';
  tipo = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private libroService: LibroService) {}

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
    if (this.tipo == '' && this.buscar == '') {
      this.pagination();
    } else {
      if (this.tipo == 'titulo') {
        this.paginationByTitulo();
      } else {
        this.paginationByCodigo();
      }
    }
  }

  pagination(): void {
    this.isLoading = true;
    this.libroService.pagination(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.dataSource.data = response.content as Libro[];
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

  paginationByTitulo(): void {
    this.isLoading = true;
    this.libroService
      .paginationByTitulo(this.buscar, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as Libro[];
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

  paginationByCodigo(): void {
    this.isLoading = true;
    this.libroService
      .paginationByCodigo(this.buscar, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as Libro[];
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

  buscador(): void {
    this.currentPage = this.currentPage != 0 ? 0 : this.currentPage;
    if (this.tipo == 'titulo') {
      this.paginationByTitulo();
    } else {
      this.paginationByCodigo();
    }
  }

  cargarTodo(): void {
    this.currentPage = 0;
    this.pagination();
    this.buscar = '';
    this.tipo = '';
  }
}
