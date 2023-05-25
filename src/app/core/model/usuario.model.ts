import { Base } from './base.model';
import { Rol } from './rol.model';

export class Usuario extends Base {
  username: string;
  password: string;
  email: string;
  nombres: string;
  apellidos: string;
  habilitado: boolean;
  roles: Rol[] = [];
}
