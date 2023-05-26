import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from 'src/app/core/model/autor.model';
import { AuthService } from 'src/app/service/auth.service';
import { AutorService } from 'src/app/service/autor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class AutorFormComponent implements OnInit {
  autor: Autor = new Autor();
  errors = {
    nombre: '',
    apellido: '',
  };

  constructor(
    private autorService: AutorService,
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeAutor();
  }

  chargeAutor(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.autorService.getOne(id).subscribe((autor) => (this.autor = autor));
      }
    });
  }

  limpiar(): void {
    this.errors = {
      nombre: '',
      apellido: '',
    };
  }

  save(): void {
    this.autorService.save(this.autor).subscribe({
      next: (autor) => {
        this.router
          .navigate([this.routerLink() + '/autores/detail', autor.id])
          .then(() => {
            console.log(autor);
            Swal.fire({
              icon: 'success',
              title: 'Autor guardado correctamente.',
              text: `Autor ${autor.nombre} ${autor.apellido} ha sido guardado.`,
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
    this.autorService.update(this.autor).subscribe({
      next: (autor) => {
        this.router
          .navigate([this.routerLink() + '/autores/detail', autor.id])
          .then(() => {
            console.log(autor);
            Swal.fire({
              icon: 'success',
              title: 'Autor actualizado correctamente.',
              text: `Autor ${autor.nombre} ${autor.apellido} ha sido guardado.`,
            });
          });
      },
      error: (err) => {
        this.errors = err.error.errors;
        console.log(this.errors);
      },
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
