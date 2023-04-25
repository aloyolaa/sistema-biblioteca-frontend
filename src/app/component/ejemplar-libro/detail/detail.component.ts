import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';

@Component({
  selector: 'app-ejemplar-libro-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class EjemplarLibroDetailComponent implements OnInit {
  title = 'Detalle de Ejemplar';
  ejemplarLibro: EjemplarLibro = new EjemplarLibro();

  constructor(
    private ejemplarLibroService: EjemplarLibroService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('id'));
      if (id) {
        this.ejemplarLibroService.getOne(id).subscribe((ejemplarLibro) => {
          this.ejemplarLibro = ejemplarLibro;
        });
      }
    });
  }
}
