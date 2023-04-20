import { Base } from './base.mode';

export interface Docente extends Base {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}
