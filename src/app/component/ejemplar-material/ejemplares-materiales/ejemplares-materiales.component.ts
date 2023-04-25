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

  constructor(private ejemplarMaterialService: EjemplarMaterialService) {}

  ngOnInit(): void {
    this.ejemplarMaterialService
      .getAll()
      .subscribe((ejemplares) => (this.ejemplares = ejemplares));
  }
}
