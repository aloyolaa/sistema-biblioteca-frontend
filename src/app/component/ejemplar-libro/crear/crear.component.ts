import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/core/model/libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';
import { LibroService } from 'src/app/service/libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejemplar-libro-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class EjemplarLibroCrearComponent {
  libro: Libro = new Libro();
  codigo = '';
  cantidad = 0;
  errors = {
    numero: '',
    libro: '',
  };

  constructor(
    private ejemplarLibroService: EjemplarLibroService,
    private libroService: LibroService,
    private authService: AuthService,
    private router: Router
  ) {}

  limpiar(): void {
    this.libro = new Libro();
    this.codigo = '';
    this.cantidad = 0;
  }

  getOneByCodigo(): void {
    this.libroService.getOneByCodigo(this.codigo).subscribe((libro) => {
      this.libro = libro;
    });
  }

  save(): void {
    this.ejemplarLibroService.save(this.libro.id, this.cantidad).subscribe({
      next: (libro) => {
        this.router
          .navigate([this.routerLink() + '/ejemplares-libros'])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Ejemplares guardados correctamente.',
              text: `${this.cantidad} ejemplares han sido guardados.`,
            });
          });
      },
      error: (e) => {
        this.errors = e.error.errors;
      },
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
