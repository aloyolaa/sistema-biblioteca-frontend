import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editorial } from 'src/app/core/model/editorial.model';
import { EditorialService } from 'src/app/service/editorial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorial-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class EditorialFormComponent implements OnInit {
  editorial: Editorial = new Editorial();
  errors = {
    nombre: '',
  };

  constructor(
    private editorialService: EditorialService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeEditorial();
  }

  chargeEditorial(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.editorialService
          .getOne(id)
          .subscribe((editorial) => (this.editorial = editorial));
      }
    });
  }

  limpiar(): void {
    this.errors = {
      nombre: '',
    };
  }

  save(): void {
    this.editorialService.save(this.editorial).subscribe({
      next: (editorial) => {
        this.router.navigate(['/editoriales/detail', editorial.id]).then(() => {
          console.log(editorial);
          Swal.fire({
            icon: 'success',
            title: 'Editorial guardada correctamente.',
            text: `Editorial ${editorial.nombre} ha sido guardada.`,
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
    this.editorialService.update(this.editorial).subscribe({
      next: (editorial) => {
        this.router.navigate(['/editoriales/detail', editorial.id]).then(() => {
          console.log(editorial);
          Swal.fire({
            icon: 'success',
            title: 'Editorial actualizada correctamente.',
            text: `Editorial ${editorial.nombre} ha sido guardada.`,
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
