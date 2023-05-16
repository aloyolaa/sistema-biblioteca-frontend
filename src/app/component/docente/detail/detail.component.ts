import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Docente } from 'src/app/core/model/docente.model';
import { DocenteService } from 'src/app/service/docente.service';

@Component({
  selector: 'app-docente-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DocenteDetailComponent implements OnInit {
  docente: Docente = new Docente();

  constructor(
    private docenteService: DocenteService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.docenteService.getOne(id).subscribe((docente) => {
          this.docente = docente;
        });
      }
    });
  }
}
