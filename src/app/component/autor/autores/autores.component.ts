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
  page = 1;

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.pagination();
  }

  pagination(): void {
    this.autorService.pagination(this.page - 1).subscribe((response) => {
      this.autores = response.content as Autor[];
    });
  }
}
