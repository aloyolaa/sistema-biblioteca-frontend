import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-libro-cerrar',
  templateUrl: './cerrar.component.html',
  styleUrls: ['./cerrar.component.css'],
})
export class PrestamoLibroCerrarComponent implements OnInit {
  prestamo: PrestamoLibro = new PrestamoLibro();

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.prestamoLibroService.getOne(id).subscribe((prestamo) => {
          this.prestamo = prestamo;
        });
      }
    });
  }

  close(): void {
    this.prestamoLibroService.close(this.prestamo).subscribe({
      next: (prestamo) => {
        this.router
          .navigate([
            this.routerLink() + '/prestamos-libros/detail',
            prestamo.id,
          ])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Préstamo cerrado correctamente.',
              text: `Préstamo de Materiales ${prestamo.id} ha sido cerrado.`,
            });
          });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
