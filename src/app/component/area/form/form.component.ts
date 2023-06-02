import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/core/model/area.model';
import { AreaService } from 'src/app/service/area.service';
import { AuthService } from 'src/app/service/auth.service';
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
    private authService: AuthService,
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
        this.router
          .navigate([this.routerLink() + '/areas/detail', area.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Area guardada correctamente.',
              text: `Area ${area.nombre} ha sido guardada.`,
            });
          });
      },
      error: (e) => {
        this.errors = e.error.errors;
      },
    });
  }

  update(): void {
    this.areaService.update(this.area).subscribe({
      next: (area) => {
        this.router
          .navigate([this.routerLink() + '/areas/detail', area.id])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Area actualizada correctamente.',
              text: `Area ${area.nombre} ha sido guardada.`,
            });
          });
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
    });
  }

  routerLink(): string {
    return this.authService.hasRol('ROLE_ADMIN') ? '/admin' : '/user';
  }
}
