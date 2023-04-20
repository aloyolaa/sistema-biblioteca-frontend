import { Base } from './base.mode';
import { Libro } from './libro.model';

export interface Ejemplar extends Base {
  numero: number;
  estado: string;
  observaciones: string;
  libro: Libro;
}
