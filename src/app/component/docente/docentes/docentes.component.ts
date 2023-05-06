import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/core/model/docente.model';
import { DocenteService } from 'src/app/service/docente.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css'],
})
export class DocentesComponent implements OnInit {
  title = 'Docentes';
  docentes: Docente[] = [];
  page = 1;

  constructor(private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.pagination();
  }

  delete(docente: Docente): void {
    this.docenteService.delete(docente.id).subscribe((response) => {
      console.log(response);
      if (response) {
        const index = this.docentes.findIndex((a) => a.id === docente.id);
        this.docentes.splice(index, 1);
      }
    });
  }

  pagination(): void {
    this.docenteService.pagination(this.page - 1).subscribe((response) => {
      this.docentes = response.content as Docente[];
    });
  }
}
