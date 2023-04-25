import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/model/categoria.model';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  title = 'Categorias';
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService
      .getAll()
      .subscribe((categorias) => (this.categorias = categorias));
  }
}
