import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { RecordNotFoundException } from '@exceptions';
import { Avaliacao } from './entities/avaliacao.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao) private repository: Repository<Avaliacao>,
  ) {}

  create(createAvaliacaoDto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const avaliacao: Avaliacao = this.repository.create(createAvaliacaoDto);
    return this.repository.save(avaliacao);
  }

  findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Avaliacao>> {
    const where: FindManyOptions<Avaliacao> = {};
    if (search) {
      where.where = [
        { metodoAvaliativo: ILike(`%${search}%`) },
        { descricao: ILike(`%${search}%`) },
        { questoes: ILike(`%${search}%`) },
        { modulo: ILike(`%${search}%`) },
        { aluno: ILike(`%${search}%`) },
      ];
    }

    return paginate<Avaliacao>(this.repository, options, where);
  }

  async findOne(id: number) {
    const avaliacao = await this.repository.findOneBy({ id });

    if (!avaliacao) {
      throw new RecordNotFoundException();
    }

    return avaliacao;
  }

  async update(
    id: number,
    updateAvaliacaoDto: UpdateAvaliacaoDto,
  ): Promise<Avaliacao> {
    await this.repository.update(id, updateAvaliacaoDto);
    const avaliacao = await this.repository.findOneBy({ id });
    if (!avaliacao) {
      throw new RecordNotFoundException();
    }

    return avaliacao;
  }

  async remove(id: number) {
    const avaliacao = await this.repository.delete(id);

    if (!avaliacao?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
