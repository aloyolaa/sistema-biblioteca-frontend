import { Base } from './base.model';
import { Docente } from './docente.model';
import { EjemplarMaterial } from './ejemplar-material.model';

export class PrestamoMaterial extends Base {
  fechaPrestamo: string;
  fechaDevolucion: string;
  descripcion: string;
  grado: number;
  seccion: string;
  activo: boolean;
  observaciones = '';
  docente: Docente;
  ejemplares: EjemplarMaterial[] = [];
}
