import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordNotFoundException } from '@exceptions';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private repository: Repository<Usuario>,
  ) {}

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.repository.findOneBy({ id });

    if (!usuario) {
      throw new RecordNotFoundException();
    }

    return usuario;
  }

  async findByEmail(email: string, includePassowrd = false): Promise<Usuario> {
    const user = await this.repository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('usuario.email = :email', { email })
      .getOne();

    if (includePassowrd) {
      return user;
    } else {
      const { senha, ...result } = user;
      return result as Usuario;
    }
  }
}
