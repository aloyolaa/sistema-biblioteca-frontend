import { Area } from './area.model';
import { Autor } from './autor.model';
import { Base } from './base.model';
import { Categoria } from './categoria.model';
import { Editorial } from './editorial.model';

export class Libro extends Base {
  codigo: string;
  titulo: string;
  anio: number;
  grado: string;
  area: Area;
  categoria: Categoria;
  editorial: Editorial;
  autores: Autor[] = [];
}
