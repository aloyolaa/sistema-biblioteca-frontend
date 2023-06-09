import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from 'src/app/core/model/material.model';
import { AuthService } from 'src/app/service/auth.service';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css'],
})
export class MaterialesComponent implements AfterViewInit, OnInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'nombre', 'detalle'];
  dataSource: MatTableDataSource<Material> = new MatTableDataSource();

  buscar = '';
  tipo = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private materialService: MaterialService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.pagination();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    if (this.tipo == '' && this.buscar == '') {
      this.pagination();
    } else {
      if (this.tipo == 'nombre') {
        this.paginationByNombre();
      } else {
        this.paginationByCodigo();
      }
    }
  }

  pagination(): void {
    this.isLoading = true;
    this.materialService.pagination(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.dataSource.data = response.content as Material[];
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

  paginationByNombre(): void {
    this.isLoading = true;
    this.materialService
      .paginationByNombre(this.buscar, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as Material[];
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
    this.materialService
      .paginationByCodigo(this.buscar, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as Material[];
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
    if (this.tipo == 'nombre') {
      this.paginationByNombre();
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
    this.materialService.exportAllToPdf().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportAllToXls(): void {
    this.materialService.exportAllToXls().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/vnd.ms-excel' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
