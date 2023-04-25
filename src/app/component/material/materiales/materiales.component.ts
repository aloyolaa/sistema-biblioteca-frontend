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

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
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
}
