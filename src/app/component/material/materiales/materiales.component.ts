import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/core/model/material.model';
import { MaterialService } from 'src/app/service/material.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css'],
})
export class MaterialesComponent implements OnInit {
  title = 'Materiales';
  materiales: Material[] = [];
  buscar = '';
  tipo = '';
  page = 1;

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.pagination();
  }

  getAll(): void {
    this.materialService
      .getAll()
      .subscribe((materiales) => (this.materiales = materiales));
  }

  delete(material: Material): void {
    this.materialService.delete(material.id).subscribe((response) => {
      console.log(response);
      if (response) {
        const index = this.materiales.findIndex((a) => a.id === material.id);
        this.materiales.splice(index, 1);
      }
    });
  }

  pagination(): void {
    this.materialService.pagination(this.page - 1).subscribe((response) => {
      this.materiales = response.content as Material[];
    });
  }

  paginationByNombre(): void {
    this.materialService
      .paginationByNombre(this.buscar, this.page - 1)
      .subscribe((response) => {
        this.materiales = response.content as Material[];
      });
  }

  paginationByCodigo(): void {
    this.materialService
      .paginationByCodigo(this.buscar, this.page - 1)
      .subscribe((response) => {
        this.materiales = response.content as Material[];
      });
  }

  buscador(): void {
    if (this.tipo == 'nombre') {
      this.paginationByNombre();
    } else {
      this.paginationByCodigo();
    }
  }

  cargarTodo(): void {
    this.page = 1;
    this.pagination();
    this.buscar = '';
    this.tipo = '';
  }
}
