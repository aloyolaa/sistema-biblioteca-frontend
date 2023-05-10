import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { Material } from 'src/app/core/model/material.model';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { MaterialService } from 'src/app/service/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejemplar-material-filter-material',
  templateUrl: './filter-material.component.html',
  styleUrls: ['./filter-material.component.css'],
})
export class EjemplarMaterialFilterMaterialComponent {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'estado', 'detalle'];
  dataSource: MatTableDataSource<EjemplarMaterial> = new MatTableDataSource();

  material: Material = new Material();
  codigo: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ejemplarMaterialService: EjemplarMaterialService,
    private materialService: MaterialService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginationByMaterial();
  }

  paginationByMaterial(): void {
    this.isLoading = true;
    this.ejemplarMaterialService
      .paginationByMaterial(this.codigo, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.content as EjemplarMaterial[];
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
    this.materialService.getOneByCodigo(this.codigo).subscribe({
      next: (material) => {
        this.material = material;
        Swal.fire({
          icon: 'success',
          title: 'Material encontrado',
          text: `El material ${this.material.nombre} ha sido encontrado`,
        });
        this.paginationByMaterial();
      },
      error: (e) => {
        console.log(e);
        this.codigo = '';
        this.material = new Material();
        this.dataSource.data = [];
      },
    });
  }
}
