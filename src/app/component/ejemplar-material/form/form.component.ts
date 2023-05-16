import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejemplar-material-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class EjemplarMaterialFormComponent implements OnInit {
  ejemplarMaterial: EjemplarMaterial = new EjemplarMaterial();

  constructor(
    private ejemplarMaterialService: EjemplarMaterialService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeEjemplarMaterial();
  }

  chargeEjemplarMaterial(): void {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.ejemplarMaterialService
          .getOne(id)
          .subscribe(
            (ejemplarMaterial) => (this.ejemplarMaterial = ejemplarMaterial)
          );
      }
    });
  }

  update(): void {
    this.ejemplarMaterialService.update(this.ejemplarMaterial).subscribe({
      next: (ejemplarMaterial) => {
        this.router
          .navigate(['/ejemplares-materiales/detail', ejemplarMaterial.id])
          .then(() => {
            console.log(ejemplarMaterial);
            Swal.fire({
              icon: 'success',
              title: 'Ejemplar actualizado correctamente.',
              text: `Ejemplar ${ejemplarMaterial.material.codigo} - ${ejemplarMaterial.numero} ha sido guardado.`,
            });
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
