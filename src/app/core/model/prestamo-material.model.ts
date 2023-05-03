import { Base } from './base.mode';
import { DetallePrestamoMaterial } from './detalle-prestamo-material.model';
import { Docente } from './docente.model';

export class PrestamoMaterial extends Base {
  fechaPrestamo: string;
  fechaDevolucion: string;
  descripcion: string;
  grado: number;
  seccion: string;
  activo: boolean;
  observaciones: string = '';
  docente: Docente;
  detalle: DetallePrestamoMaterial[] = [];
}
