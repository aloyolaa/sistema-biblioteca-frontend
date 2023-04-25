import { Base } from './base.mode';
import { Libro } from './libro.model';

export class EjemplarLibro extends Base {
  numero: number;
  estado: string;
  observaciones: string;
  libro: Libro;
}
