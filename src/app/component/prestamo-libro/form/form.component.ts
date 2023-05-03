import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePrestamoLibro } from 'src/app/core/model/detalle-prestamo-libro.model';
import { Docente } from 'src/app/core/model/docente.model';
import { EjemplarLibro } from 'src/app/core/model/ejemplar-libro.model';
import { Libro } from 'src/app/core/model/libro.model';
import { PrestamoLibro } from 'src/app/core/model/prestamo-libro.model';
import { DocenteService } from 'src/app/service/docente.service';
import { EjemplarLibroService } from 'src/app/service/ejemplar-libro.service';
import { LibroService } from 'src/app/service/libro.service';
import { PrestamoLibroService } from 'src/app/service/prestamo-libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamo-libro-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class PrestamoLibroFormComponent {
  title = 'Nuevo Préstamo';
  prestamo: PrestamoLibro = new PrestamoLibro();
  docente: Docente = new Docente();
  libro: Libro = new Libro();
  ejemplares: EjemplarLibro[] = [];
  ejemplaresDisponibles = 0;
  codigo: string = '';
  dni: string = '';
  cantidad: number = 0;
  errors = {
    fechaPrestamo: '',
    descripcion: '',
    grado: '',
    seccion: '',
    docente: '',
    detalle: '',
  };

  constructor(
    private prestamoLibroService: PrestamoLibroService,
    private docenteService: DocenteService,
    private ejemplarLibroService: EjemplarLibroService,
    private libroService: LibroService,
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
    this.libroService.getOneByCodigo(this.codigo).subscribe((libro) => {
      console.log(this.libro);
      console.log(libro);
      this.libro = libro;
      console.log(this.libro);
    });
    this.countByLibroAndEstado(this.codigo);
  }

  countByLibroAndEstado(codigo: string): void {
    this.ejemplarLibroService.countByLibroAndEstado(codigo).subscribe((e) => {
      console.log(e);
      this.ejemplaresDisponibles = e;
      console.log(this.ejemplaresDisponibles);
    });
  }

  existItem(id: number): boolean {
    let exist = false;
    this.ejemplares.forEach((ejemplar: EjemplarLibro) => {
      if (id === ejemplar.id) {
        exist = true;
      }
    });
    return exist;
  }

  getAllByLibro(): void {
    if (this.cantidad <= this.ejemplaresDisponibles) {
      this.ejemplares.forEach((e) => {
        if (e.libro.codigo == this.libro.codigo) {
          this.deleteEjemplar(e.id);
        }
      });
      this.ejemplarLibroService
        .getAllByLibroAndEstado(this.codigo, this.cantidad)
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
        text: `Solo existen ${this.ejemplaresDisponibles} ejemplares disponibles del libro ${this.libro.titulo}.`,
      });
    }
  }

  deleteEjemplar(id: number): void {
    this.ejemplares = this.ejemplares.filter(
      (ejemplar: EjemplarLibro) => id !== ejemplar.id
    );
  }

  addDetalle(): void {
    this.ejemplares.forEach((e) => {
      let detallePrestamo = new DetallePrestamoLibro();
      detallePrestamo.ejemplarLibro = e;
      this.prestamo.detalle.push(detallePrestamo);
    });
  }

  save(): void {
    this.addDetalle();
    console.log(this.prestamo);
    this.prestamoLibroService.save(this.prestamo).subscribe({
      next: (prestamo) => {
        this.router
          .navigate(['/prestamos-libros/detail', prestamo.id])
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
