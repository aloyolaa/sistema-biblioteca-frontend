import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/core/model/libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements AfterViewInit, OnInit {
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

  constructor(
    private libroService: LibroService,
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

  exportAllToPdf(): void {
    this.libroService.exportAllToPdf().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportAllToXls(): void {
    this.libroService.exportAllToXls().subscribe((response: BlobPart) => {
      const file = new Blob([response], {type: 'application/vnd.ms-excel'});
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
