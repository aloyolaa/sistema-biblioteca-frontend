import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';

@Component({
  selector: 'app-ejemplares-materiales',
  templateUrl: './ejemplares-materiales.component.html',
  styleUrls: ['./ejemplares-materiales.component.css'],
})
export class EjemplaresMaterialesComponent implements AfterViewInit, OnInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'estado', 'detalle'];
  dataSource: MatTableDataSource<EjemplarMaterial> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ejemplarMaterialService: EjemplarMaterialService,
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
    this.ejemplarMaterialService
      .pagination(this.currentPage, this.pageSize)
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

  exportAllToPdf(): void {
    this.ejemplarMaterialService
      .exportAllToPdf()
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportAllToXls(): void {
    this.ejemplarMaterialService
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
