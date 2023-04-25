import { Base } from './base.mode';
import { Material } from './material.model';

export class EjemplarMaterial extends Base {
  numero: number;
  estado: string;
  observaciones: string;
  material: Material;
}
