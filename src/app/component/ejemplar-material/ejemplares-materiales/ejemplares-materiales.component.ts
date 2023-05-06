import { Component, OnInit } from '@angular/core';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';

@Component({
  selector: 'app-ejemplares-materiales',
  templateUrl: './ejemplares-materiales.component.html',
  styleUrls: ['./ejemplares-materiales.component.css'],
})
export class EjemplaresMaterialesComponent implements OnInit {
  title = 'Ejemplares de Materiales';
  ejemplares: EjemplarMaterial[] = [];
  page = 1;

  constructor(private ejemplarMaterialService: EjemplarMaterialService) {}

  ngOnInit(): void {
    this.pagination();
  }

  pagination(): void {
    this.ejemplarMaterialService
      .pagination(this.page - 1)
      .subscribe((response) => {
        this.ejemplares = response.content as EjemplarMaterial[];
      });
  }
}
