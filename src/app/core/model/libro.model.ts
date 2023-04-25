import { Area } from './area.model';
import { Autor } from './autor.model';
import { Base } from './base.mode';
import { Categoria } from './categoria.model';
import { Editorial } from './editorial.model';

export class Libro extends Base {
  codigo: string;
  titulo: string;
  anio: number;
  grado: number;
  area: Area;
  categoria: Categoria;
  editorial: Editorial;
  autor: Autor;
}
