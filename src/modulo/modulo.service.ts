import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { Modulo } from './entities/modulo.entity';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo) private repository: Repository<Modulo>,
  ) {}

  create(createModuloDto: CreateModuloDto): Promise<Modulo> {
    const modulo: Modulo = this.repository.create(createModuloDto);
    return this.repository.save(modulo);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Modulo>> {
    const where: FindOptionsWhere<Modulo> = {};

    if (search) {
      where.descricao = ILike(`%${search}%`);
    }

    return paginate<Modulo>(this.repository, options, { where });
  }

  async findOne(id: number) {
    const modulo = await this.repository.findOneBy({ id });

    if (!modulo) {
      throw new RecordNotFoundException();
    }

    return modulo;
  }

  async update(id: number, updateModuloDto: UpdateModuloDto): Promise<Modulo> {
    await this.repository.update(id, updateModuloDto);
    const modulo = await this.repository.findOneBy({ id });
    if (!modulo) {
      throw new RecordNotFoundException();
    }

    return modulo;
  }

  async remove(id: number) {
    const modulo = await this.repository.delete(id);

    if (!modulo?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
