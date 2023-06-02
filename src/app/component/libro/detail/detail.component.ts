import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/core/model/libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-libro-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class LibroDetailComponent implements OnInit {
  libro: Libro = new Libro();
  ejemplares = 0;
  ejemplaresDisponibles = 0;

  constructor(
    private libroService: LibroService,
    private ejemplarLibroService: EjemplarLibroService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.libroService.getOne(id).subscribe((libro) => {
          this.libro = libro;
          this.countByLibro(this.libro.codigo);
          this.countByLibroAndEstado(this.libro.codigo);
        });
      }
    });
  }

  countByLibro(codigo: string): void {
    this.ejemplarLibroService.countByLibro(codigo).subscribe((e) => {
      this.ejemplares = e;
    });
  }

  countByLibroAndEstado(codigo: string): void {
    this.ejemplarLibroService.countByLibroAndEstado(codigo).subscribe((e) => {
      this.ejemplaresDisponibles = e;
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
