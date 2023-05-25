import { Base } from './base.model';
import { Material } from './material.model';

export class EjemplarMaterial extends Base {
  numero: number;
  estado: string;
  prestado: boolean;
  observaciones: string;
  material: Material;
}
