import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/core/model/area.model';
import { AreaService } from 'src/app/service/area.service';

@Component({
  selector: 'app-area-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class AreaDetailComponent implements OnInit {
  title = 'Detalle de Area';
  area: Area = new Area();

  constructor(
    private areaService: AreaService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      let id: number = Number(params.get('id'));
      if (id) {
        this.areaService.getOne(id).subscribe((area) => {
          this.area = area;
        });
      }
    });
  }
}
