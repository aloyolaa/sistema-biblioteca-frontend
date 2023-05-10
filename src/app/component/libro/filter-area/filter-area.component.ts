import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from 'src/app/core/model/area.model';
import { Libro } from 'src/app/core/model/libro.model';
import { AreaService } from 'src/app/service/area.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-filter-area',
  templateUrl: './filter-area.component.html',
  styleUrls: ['./filter-area.component.css'],
})
export class LibroFilterAreaComponent {
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  columnas: string[] = ['id', 'codigo', 'titulo', 'detalle'];
  dataSource: MatTableDataSource<Libro> = new MatTableDataSource();

  id = 0;
  areas: Area[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private libroService: LibroService,
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
    this.libroService.paginationByArea(this.id, this.currentPage, this.pageSize).subscribe({
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
