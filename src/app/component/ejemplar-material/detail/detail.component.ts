import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';

@Component({
  selector: 'app-ejemplar-material-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class EjemplarMaterialDetailComponent implements OnInit {
  ejemplarMaterial: EjemplarMaterial = new EjemplarMaterial();

  constructor(
    private ejemplarMaterialService: EjemplarMaterialService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.ejemplarMaterialService
          .getOne(id)
          .subscribe((ejemplarMaterial) => {
            this.ejemplarMaterial = ejemplarMaterial;
          });
      }
    });
  }
}
