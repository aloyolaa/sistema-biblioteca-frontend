import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Editorial } from 'src/app/core/model/editorial.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { EditorialService } from 'src/app/service/editorial.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-editorial',
  templateUrl: './filter-editorial.component.html',
  styleUrls: ['./filter-editorial.component.css'],
})
export class LibroFilterEditorialComponent implements AfterViewInit, OnInit {
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
    private editorialService: EditorialService,
    private authService: AuthService
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

  exportByEditorialToPdf(): void {
    this.libroService
      .exportByEditorialToPdf(this.id)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportByEditorialToXls(): void {
    this.libroService
      .exportByEditorialToXls(this.id)
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
