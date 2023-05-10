import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from 'src/app/core/model/material.model';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css'],
})
export class MaterialesComponent {
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

  constructor(private materialService: MaterialService) {}

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
}
