import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetallePrestamoMaterial } from 'src/app/core/model/detalle-prestamo-material.model';
import { Docente } from 'src/app/core/model/docente.model';
import { EjemplarMaterial } from 'src/app/core/model/ejemplar-material.model';
import { Material } from 'src/app/core/model/material.model';
import { PrestamoMaterial } from 'src/app/core/model/prestamo-material.model';
import { DocenteService } from 'src/app/service/docente.service';
import { EjemplarMaterialService } from 'src/app/service/ejemplar-material.service';
import { MaterialService } from 'src/app/service/material.service';
import { PrestamoMaterialService } from 'src/app/service/prestamo-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-material-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class PrestamoMaterialFormComponent {
  prestamo: PrestamoMaterial = new PrestamoMaterial();
  docente: Docente = new Docente();
  material: Material = new Material();
  ejemplares: EjemplarMaterial[] = [];
  ejemplaresDisponibles = 0;
  codigo: string = '';
  dni: string = '';
  cantidad: number = 0;
  errors = {
    descripcion: '',
    grado: '',
    seccion: '',
    docente: '',
    detalle: '',
  };

  columnas: string[] = ['codigo', 'titulo', 'estado', 'eliminar'];
  dataSource: MatTableDataSource<EjemplarMaterial> = new MatTableDataSource();

  constructor(
    private prestamoMaterialService: PrestamoMaterialService,
    private docenteService: DocenteService,
    private ejemplarMaterialService: EjemplarMaterialService,
    private materialService: MaterialService,
    private router: Router
  ) {}

  getOneByDni(): void {
    this.docenteService.getOneByDni(this.dni).subscribe((docente) => {
      console.log(this.docente);
      console.log(docente);
      this.docente = docente;
      console.log(this.docente);
    });
    this.prestamo.docente = this.docente;
  }

  getOneByCodigo(): void {
    this.materialService.getOneByCodigo(this.codigo).subscribe((material) => {
      console.log(this.material);
      console.log(material);
      this.material = material;
      console.log(this.material);
    });
    this.countByMaterialAndEstado(this.codigo);
  }

  countByMaterialAndEstado(codigo: string): void {
    this.ejemplarMaterialService
      .countByMaterialAndEstado(codigo)
      .subscribe((e) => {
        console.log(e);
        this.ejemplaresDisponibles = e;
        console.log(this.ejemplaresDisponibles);
      });
  }

  existItem(id: number): boolean {
    let exist = false;
    this.ejemplares.forEach((ejemplar: EjemplarMaterial) => {
      if (id === ejemplar.id) {
        exist = true;
      }
    });
    return exist;
  }

  getAllByMaterial(): void {
    if (this.cantidad <= this.ejemplaresDisponibles) {
      this.ejemplares.forEach((e) => {
        if (e.material.codigo == this.material.codigo) {
          this.deleteEjemplar(e.id);
        }
      });
      this.ejemplarMaterialService
        .getAllByMaterialAndEstado(this.codigo, this.cantidad)
        .subscribe((ejemplares) => {
          ejemplares.forEach((e) => {
            if (!this.existItem(e.id)) {
              this.ejemplares.push(e);
            }
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title:
          'No se pueden solicitar más ejemplares que los que estan disponibles.',
        text: `Solo existen ${this.ejemplaresDisponibles} ejemplares disponibles del material ${this.material.nombre}.`,
      });
    }
  }

  deleteEjemplar(id: number): void {
    this.ejemplares = this.ejemplares.filter(
      (ejemplar: EjemplarMaterial) => id !== ejemplar.id
    );
  }

  addDetalle(): void {
    this.ejemplares.forEach((e) => {
      let detallePrestamo = new DetallePrestamoMaterial();
      detallePrestamo.ejemplarMaterial = e;
      this.prestamo.detalle.push(detallePrestamo);
    });
  }

  save(): void {
    this.addDetalle();
    console.log(this.prestamo);
    this.prestamoMaterialService.save(this.prestamo).subscribe({
      next: (prestamo) => {
        this.router
          .navigate(['/prestamos-materiales/detail', prestamo.id])
          .then(() => {
            console.log(prestamo);
            Swal.fire({
              icon: 'success',
              title: 'Prestamo guardado correctamente.',
              text: `Prestamo ${prestamo.id} ha sido guardado.`,
            });
          });
      },
      error: (e) => {
        this.errors = e.error.errors;
        console.log(this.errors);
      },
    });
  }
}
