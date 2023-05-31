import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';

@Component({
  selector: 'app-ejemplar-libro-ejemplares',
  templateUrl: './ejemplares-libros.component.html',
  styleUrls: ['./ejemplares-libros.component.css'],
})
export class EjemplaresLibrosComponent implements AfterViewInit, OnInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'estado', 'detalle'];
  dataSource: MatTableDataSource<EjemplarLibro> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ejemplarLibroService: EjemplarLibroService,
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
    this.pagination();
  }

  pagination(): void {
    this.isLoading = true;
    this.ejemplarLibroService
      .pagination(this.currentPage, this.pageSize)
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

  exportAllToPdf(): void {
    this.ejemplarLibroService
      .exportAllToPdf()
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportAllToXls(): void {
    this.ejemplarLibroService
      .exportAllToXls()
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
