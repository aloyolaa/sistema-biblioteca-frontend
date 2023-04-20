import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/core/model/area.model';
import { AreaService } from 'src/app/service/area.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css'],
})
export class AreaFormComponent implements OnInit {
  title = 'Formulario de Area';
  area: Area = {
    id: 0,
    nombre: '',
  };

  constructor(
    private areaService: AreaService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeArea();
  }

  chargeArea(): void {
    this.activedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.areaService
          .getOne(id)
          .subscribe((response) => (this.area = response));
      }
    });
  }

  save(): void {
    this.areaService.save(this.area).subscribe((response) => {
      this.router.navigate(['/areas']);
    });
  }

  update(): void {
    this.areaService.update(this.area).subscribe((response) => {
      this.router.navigate(['/areas']);
    });
  }
}
