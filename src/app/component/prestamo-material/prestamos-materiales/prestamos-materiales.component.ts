import { Component, OnInit } from '@angular/core';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';

@Component({
  selector: 'app-prestamos-materiales',
  templateUrl: './prestamos-materiales.component.html',
  styleUrls: ['./prestamos-materiales.component.css'],
})
export class PrestamosMaterialesComponent implements OnInit {
  title = 'Préstamos de Materiales';
  prestamos: PrestamoMaterial[] = [];

  constructor(private prestamoMaterialService: PrestamoMaterialService) {}

  ngOnInit(): void {
    this.prestamoMaterialService
      .getAll()
      .subscribe((prestamos) => (this.prestamos = prestamos));
  }
}
