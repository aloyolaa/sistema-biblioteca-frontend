import { Base } from "../model/base.model";
import { Rol } from "../model/rol.model";

export class UsuarioDto extends Base {
  username: string;
  email: string;
  nombres: string;
  apellidos: string;
  habilitado: boolean;
  roles: Rol[] = [];
}
