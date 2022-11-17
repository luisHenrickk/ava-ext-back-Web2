import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';
import { Telefone } from './entities/telefone.entity';

@Injectable()
export class TelefoneService {
  constructor(
    @InjectRepository(Telefone) private repository: Repository<Telefone>,
  ) {}

  create(createTelefoneDto: CreateTelefoneDto): Promise<Telefone> {
    const telefone: Telefone = this.repository.create(createTelefoneDto);
    telefone.telefone = createTelefoneDto.telefone;
    telefone.tipo = createTelefoneDto.tipo;
    telefone.aluno = telefone.aluno;
    telefone.professor = telefone.professor;
    return this.repository.save(telefone);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Telefone>> {
    const where: FindManyOptions<Telefone> = {};
    if (search) {
      where.where = [
        { telefone: ILike(`%${search}%`) },
        { tipo: ILike(`%${search}%`) },
      ];
    }

    return paginate<Telefone>(this.repository, options, where);
  }

  async findOne(id: number) {
    const telefone = await this.repository.findOneBy({ id });

    if (!telefone) {
      throw new RecordNotFoundException();
    }

    return telefone;
  }

  async update(
    id: number,
    updateTelefoneDto: UpdateTelefoneDto,
  ): Promise<Telefone> {
    await this.repository.update(id, updateTelefoneDto);
    const telefone = await this.repository.findOneBy({ id });
    if (!telefone) {
      throw new RecordNotFoundException();
    }

    return telefone;
  }

  async remove(id: number) {
    const telefone = await this.repository.delete(id);

    if (!telefone?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
