import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/core/model/area.model';
import { AreaService } from 'src/app/service/area.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],
})
export class AreasComponent implements OnInit {
  title = 'Areas';
  areas: Area[] = [];

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.areaService.getAll().subscribe((areas) => (this.areas = areas));
  }

  delete(area: Area): void {
    this.areaService.delete(area.id).subscribe((response) => {
      console.log(response);
      if (response) {
        const index = this.areas.findIndex((a) => a.id === area.id);
        this.areas.splice(index, 1);
      }
    });
  }
}
