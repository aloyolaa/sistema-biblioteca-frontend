import { Base } from './base.model';
import { DetallePrestamoMaterial } from './detalle-prestamo-material.model';
import { Docente } from './docente.model';

export class PrestamoMaterial extends Base {
  fechaPrestamo: string;
  fechaDevolucion: string;
  descripcion: string;
  grado: number;
  seccion: string;
  activo: boolean;
  observaciones = '';
  docente: Docente;
  detalle: DetallePrestamoMaterial[] = [];
}
