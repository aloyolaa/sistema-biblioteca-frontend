import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from 'src/app/core/model/area.model';
import { Material } from 'src/app/core/model/material.model';
import { AreaService } from 'src/app/service/area.service';
import { AuthService } from 'src/app/service/auth.service';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-material-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.css'],
})
export class MaterialFilterAreaComponent implements AfterViewInit, OnInit {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'nombre', 'detalle'];
  dataSource: MatTableDataSource<Material> = new MatTableDataSource();

  id = 0;
  areas: Area[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private materialService: MaterialService,
    private areaService: AreaService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginationByArea();
  }

  paginationByArea(): void {
    this.isLoading = true;
    this.materialService
      .paginationByArea(this.id, this.currentPage, this.pageSize)
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

  exportByAreaToPdf(): void {
    this.materialService
      .exportByAreaToPdf(this.id)
      .subscribe((response: BlobPart) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }

  exportByAreaToXls(): void {
    this.materialService
      .exportByAreaToXls(this.id)
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
