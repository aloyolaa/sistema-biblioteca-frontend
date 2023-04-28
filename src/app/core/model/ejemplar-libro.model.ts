import { Base } from './base.mode';
import { Libro } from './libro.model';

export class EjemplarLibro extends Base {
  numero: number;
  estado: string;
  prestado: boolean;
  observaciones: string;
  libro: Libro;
}
