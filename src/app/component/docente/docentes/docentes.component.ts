import { Component } from '@angular/core';
import { Docente } from 'src/app/core/model/docente.model';
import { DocenteService } from 'src/app/service/docente.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css'],
})
export class DocentesComponent {
  title = 'Docentes';
  docentes: Docente[] = [];

  constructor(private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.docenteService
      .getAll()
      .subscribe((docentes) => (this.docentes = docentes));
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
}
