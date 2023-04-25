import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/core/model/categoria.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class CategoriaFormComponent implements OnInit {
  title = 'Formulario de Categoria';
  categoria: Categoria = new Categoria();
  errors = {
    nombre: '',
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeCategoria();
  }

  chargeCategoria(): void {
    this.activedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.categoriaService
          .getOne(id)
          .subscribe((categoria) => (this.categoria = categoria));
      }
    });
  }

  save(): void {
    this.categoriaService.save(this.categoria).subscribe({
      next: (categoria) => {
        this.router.navigate(['/categorias/detail', categoria.id]).then(() => {
          console.log(categoria);
          Swal.fire({
            icon: 'success',
            title: 'Categoria guardada correctamente.',
            text: `Categoria ${categoria.nombre} ha sido guardada.`,
          });
        });
      },
      error: (e) => {
        this.errors = e.error.errors;
        console.log(this.errors);
      },
    });
  }

  update(): void {
    this.categoriaService.update(this.categoria).subscribe({
      next: (categoria) => {
        this.router.navigate(['/categorias/detail', categoria.id]).then(() => {
          console.log(categoria);
          Swal.fire({
            icon: 'success',
            title: 'Categoria actualizada correctamente.',
            text: `Categoria ${categoria.nombre} ha sido guardada.`,
          });
        });
      },
      error: (err) => {
        this.errors = err.error.errors;
        console.log(this.errors);
      },
    });
  }
}
