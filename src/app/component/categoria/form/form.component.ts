import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/core/model/categoria.model';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class CategoriaFormComponent implements OnInit {
  categoria: Categoria = new Categoria();
  errors = {
    nombre: '',
  };

  constructor(
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeCategoria();
  }

  chargeCategoria(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.categoriaService
          .getOne(id)
          .subscribe((categoria) => (this.categoria = categoria));
      }
    });
  }

  limpiar(): void {
    this.errors = {
      nombre: '',
    };
  }

  save(): void {
    this.categoriaService.save(this.categoria).subscribe({
      next: (categoria) => {
        this.router
          .navigate([this.routerLink() + '/categorias/detail', categoria.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Categoria guardada correctamente.',
              text: `Categoria ${categoria.nombre} ha sido guardada.`,
            });
          });
      },
      error: (e) => {
        this.errors = e.error.errors;
      },
    });
  }

  update(): void {
    this.categoriaService.update(this.categoria).subscribe({
      next: (categoria) => {
        this.router
          .navigate([this.routerLink() + '/categorias/detail', categoria.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Categoria actualizada correctamente.',
              text: `Categoria ${categoria.nombre} ha sido guardada.`,
            });
          });
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
