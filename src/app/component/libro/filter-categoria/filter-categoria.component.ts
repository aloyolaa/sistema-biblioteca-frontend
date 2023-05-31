import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/core/model/categoria.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-categoria',
  templateUrl: './filter-categoria.component.html',
  styleUrls: ['./filter-categoria.component.css'],
})
export class LibroFilterCategoriaComponent implements AfterViewInit, OnInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'titulo', 'detalle'];
  dataSource: MatTableDataSource<Libro> = new MatTableDataSource();

  id = 0;
  categorias: Categoria[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private libroService: LibroService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.categoriaService
      .getAll()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginationByCategoria();
  }

  paginationByCategoria(): void {
    this.isLoading = true;
    this.libroService
      .paginationByCategoria(this.id, this.currentPage, this.pageSize)
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

  exportByCategoriaToPdf(): void {
    this.libroService
      .exportByCategoriaToPdf(this.id)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportByCategoriaToXls(): void {
    this.libroService
      .exportByCategoriaToXls(this.id)
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
