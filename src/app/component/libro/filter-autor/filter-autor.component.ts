import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from 'src/app/core/model/autor.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AutorService } from 'src/app/service/autor.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-autor',
  templateUrl: './filter-autor.component.html',
  styleUrls: ['./filter-autor.component.css'],
})
export class LibroFilterAutorComponent implements AfterViewInit, OnInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'titulo', 'detalle'];
  dataSource: MatTableDataSource<Libro> = new MatTableDataSource();

  id = 0;
  autores: Autor[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private libroService: LibroService,
    private autorService: AutorService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.autorService.getAll().subscribe((autores) => (this.autores = autores));
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginationByAutor();
  }

  paginationByAutor(): void {
    this.isLoading = true;
    this.libroService
      .paginationByAutor(this.id, this.currentPage, this.pageSize)
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
}
