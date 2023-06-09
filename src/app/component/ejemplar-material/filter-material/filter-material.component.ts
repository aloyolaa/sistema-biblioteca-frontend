import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { Material } from 'src/app/core/model/material.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { MaterialService } from 'src/app/service/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejemplar-material-filter-material',
  templateUrl: './filter-material.component.html',
  styleUrls: ['./filter-material.component.css'],
})
export class EjemplarMaterialFilterMaterialComponent implements AfterViewInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'estado', 'detalle'];
  dataSource: MatTableDataSource<EjemplarMaterial> = new MatTableDataSource();

  material: Material = new Material();
  codigo = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ejemplarMaterialService: EjemplarMaterialService,
    private materialService: MaterialService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: PageEvent) {
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

  exportByMaterialToPdf(): void {
    this.ejemplarMaterialService
      .exportByMaterialToPdf(this.material.id)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportByMaterialToXls(): void {
    this.ejemplarMaterialService
      .exportByMaterialToXls(this.material.id)
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
