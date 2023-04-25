import { Base } from './base.mode';
import { DetallePrestamoLibro } from './detalle-prestamo-libro.model';
import { Docente } from './docente.model';

export class PrestamoLibro extends Base {
  fechaPrestamo: string;
  fechaDevolucion: string;
  descripcion: string;
  grado: number;
  seccion: string;
  estado: string;
  observaciones: string;
  docente: Docente;
  detalle: DetallePrestamoLibro[];
}
