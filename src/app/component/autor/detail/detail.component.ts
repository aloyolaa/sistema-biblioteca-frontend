import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Autor } from 'src/app/core/model/autor.model';
import { AutorService } from 'src/app/service/autor.service';

@Component({
  selector: 'app-autor-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class AutorDetailComponent implements OnInit {
  autor: Autor = new Autor();

  constructor(
    private autorService: AutorService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.autorService.getOne(id).subscribe((autor) => {
        this.autor = autor;
      });
    });
  }
}
