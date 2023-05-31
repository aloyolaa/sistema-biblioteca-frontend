import { Base } from './base.model';
import { Docente } from './docente.model';
import { EjemplarLibro } from './ejemplar-libro.model';

export class PrestamoLibro extends Base {
  fechaPrestamo: string;
  fechaDevolucion: string;
  descripcion: string;
  grado: number;
  seccion: string;
  activo: boolean;
  observaciones = '';
  docente: Docente;
  ejemplares: EjemplarLibro[] = [];
}
