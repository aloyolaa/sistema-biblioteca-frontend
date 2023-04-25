import { Base } from './base.mode';
import { EjemplarLibro } from './ejemplar-libro.model';

export class DetallePrestamoLibro extends Base {
  ejemplarLibro: EjemplarLibro;
}
