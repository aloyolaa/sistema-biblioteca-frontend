import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/core/model/categoria.model';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class CategoriaDetailComponent implements OnInit {
  title = 'Detalle de Categoria';
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('id'));
      this.categoriaService.getOne(id).subscribe((categoria) => {
        this.categoria = categoria;
      });
    });
  }
}
