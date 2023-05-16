import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/core/model/area.model';
import { AreaService } from 'src/app/service/area.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class AreaFormComponent implements OnInit {
  area: Area = new Area();
  errors = {
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
      const id = params['id'];
      if (id) {
        this.areaService.getOne(id).subscribe((area) => (this.area = area));
      }
    });
  }

  limpiar(): void {
    this.errors = {
      nombre: '',
    };
  }

  save(): void {
    this.areaService.save(this.area).subscribe({
      next: (area) => {
        this.router.navigate(['/areas/detail', area.id]).then(() => {
          console.log(area);
          Swal.fire({
            icon: 'success',
            title: 'Area guardada correctamente.',
            text: `Area ${area.nombre} ha sido guardada.`,
          });
        });
      },
      error: (e) => {
        this.errors = e.error.errors;
        console.log(this.errors);
      },
    });
  }

  update(): void {
    this.areaService.update(this.area).subscribe({
      next: (area) => {
        this.router.navigate(['/areas/detail', area.id]).then(() => {
          console.log(area);
          Swal.fire({
            icon: 'success',
            title: 'Area actualizada correctamente.',
            text: `Area ${area.nombre} ha sido guardada.`,
          });
        });
      },
      error: (err) => {
        this.errors = err.error.errors;
        console.log(this.errors);
      },
    });
  }
}
