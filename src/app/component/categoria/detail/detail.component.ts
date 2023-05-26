import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/core/model/categoria.model';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class CategoriaDetailComponent implements OnInit {
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.categoriaService.getOne(id).subscribe((categoria) => {
        this.categoria = categoria;
      });
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
