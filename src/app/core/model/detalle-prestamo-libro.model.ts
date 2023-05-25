import { Base } from './base.model';
import { EjemplarLibro } from './ejemplar-libro.model';

export class DetallePrestamoLibro extends Base {
  ejemplarLibro: EjemplarLibro;
}
