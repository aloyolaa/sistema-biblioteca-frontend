import { Base } from './base.mode';
import { Ejemplar } from './ejemplar.model';

export interface DetallePrestamoLibro extends Base {
  ejemplar: Ejemplar;
}
