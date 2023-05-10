import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from 'src/app/core/model/area.model';
import { Material } from 'src/app/core/model/material.model';
import { AreaService } from 'src/app/service/area.service';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-material-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.css'],
})
export class MaterialFilterAreaComponent {
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
    private areaService: AreaService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
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
}
