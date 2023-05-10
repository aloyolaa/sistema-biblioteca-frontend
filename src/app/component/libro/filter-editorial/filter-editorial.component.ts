import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from 'src/app/core/model/autor.model';
import { Editorial } from 'src/app/core/model/editorial.model';
import { Libro } from 'src/app/core/model/libro.model';
import { EditorialService } from 'src/app/service/editorial.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-editorial',
  templateUrl: './filter-editorial.component.html',
  styleUrls: ['./filter-editorial.component.css'],
})
export class LibroFilterEditorialComponent {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'titulo', 'detalle'];
  dataSource: MatTableDataSource<Libro> = new MatTableDataSource();

  id = 0;
  editoriales: Editorial[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private libroService: LibroService,
    private editorialService: EditorialService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.editorialService
      .getAll()
      .subscribe((editoriales) => (this.editoriales = editoriales));
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginationByEditorial();
  }

  paginationByEditorial(): void {
    this.isLoading = true;
    this.libroService
      .paginationByEditorial(this.id, this.currentPage, this.pageSize)
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