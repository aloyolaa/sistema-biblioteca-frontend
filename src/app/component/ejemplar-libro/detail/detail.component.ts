import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { AuthService } from 'src/app/service/auth.service';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';

@Component({
  selector: 'app-ejemplar-libro-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class EjemplarLibroDetailComponent implements OnInit {
  ejemplarLibro: EjemplarLibro = new EjemplarLibro();

  constructor(
    private ejemplarLibroService: EjemplarLibroService,
    private authService: AuthService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.ejemplarLibroService.getOne(id).subscribe((ejemplarLibro) => {
          this.ejemplarLibro = ejemplarLibro;
        });
      }
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
