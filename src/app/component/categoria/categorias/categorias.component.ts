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
  page = 1;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.pagination();
  }

  pagination(): void {
    this.categoriaService.pagination(this.page - 1).subscribe((response) => {
      this.categorias = response.content as Categoria[];
    });
  }
}
