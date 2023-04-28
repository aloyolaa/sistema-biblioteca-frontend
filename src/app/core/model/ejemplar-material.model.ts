import { Base } from './base.mode';
import { Material } from './material.model';

export class EjemplarMaterial extends Base {
  numero: number;
  estado: string;
  prestado: boolean;
  observaciones: string;
  material: Material;
}
