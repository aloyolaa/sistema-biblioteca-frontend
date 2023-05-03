import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/core/model/area.model';
import { Material } from 'src/app/core/model/material.model';
import { AreaService } from 'src/app/service/area.service';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-material-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class MaterialFilterComponent implements OnInit {
  title = 'Materiales';
  materiales: Material[] = [];
  page = 1;
  id = 0;
  tipo = '';
  areas: Area[] = [];

  constructor(
    private materialService: MaterialService,
    private areaService: AreaService
  ) {}

  ngOnInit(): void {
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  paginationByArea(): void {
    this.materialService
      .paginationByArea(this.id, this.page - 1)
      .subscribe((response) => {
        this.materiales = response.content as Material[];
      });
  }

  filtrar(): void {
    if (this.tipo == 'area') {
      this.paginationByArea();
    }
  }
}
