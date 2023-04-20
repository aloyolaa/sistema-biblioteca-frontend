import { Base } from './base.mode';
import { DetallePrestamoMaterial } from './detalle-prestamo-material.model';
import { Docente } from './docente.model';

export interface PrestamoMaterial extends Base {
  fechaPrestamo: string;
  fechaLimite: string;
  fechaDevolucion: string;
  descripcion: string;
  grado: number;
  seccion: string;
  estado: string;
  observaciones: string;
  docente: Docente;
  detalle: DetallePrestamoMaterial[];
}
