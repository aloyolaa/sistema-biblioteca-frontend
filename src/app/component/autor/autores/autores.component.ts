import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/core/model/autor.model';
import { AutorService } from 'src/app/service/autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit {
  title = 'Autores';
  autores: Autor[] = [];

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.autorService.getAll().subscribe((autores) => (this.autores = autores));
  }
}
