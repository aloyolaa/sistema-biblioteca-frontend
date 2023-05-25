import { Area } from './area.model';
import { Base } from './base.model';

export class Material extends Base {
  codigo: string;
  nombre: string;
  medidas: string;
  area: Area;
}
