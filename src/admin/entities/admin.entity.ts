import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Admin extends Usuario {}
