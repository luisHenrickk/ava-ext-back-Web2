import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import { Arquivo } from './entities/arquivo.entity';

@Injectable()
export class ArquivoService {
  constructor(
    @InjectRepository(Arquivo) private repository: Repository<Arquivo>,
  ) {}

  create(createArquivoDto: CreateArquivoDto): Promise<Arquivo> {
    const arquivo: Arquivo = this.repository.create(createArquivoDto);
    return this.repository.save(arquivo);
  }

  findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Arquivo>> {
    const where: FindManyOptions<Arquivo> = {};
    if (search) {
      where.where = [{ aula: ILike(`%${search}%`) }];
    }

    return paginate<Arquivo>(this.repository, options, where);
  }

  async findOne(id: number) {
    const arquivo = await this.repository.findOneBy({ id });

    if (!arquivo) {
      throw new RecordNotFoundException();
    }

    return arquivo;
  }

  async update(
    id: number,
    updateArquivoDto: UpdateArquivoDto,
  ): Promise<Arquivo> {
    await this.repository.update(id, updateArquivoDto);
    const arquivo = await this.repository.findOneBy({ id });
    if (!arquivo) {
      throw new RecordNotFoundException();
    }

    return arquivo;
  }

  async remove(id: number) {
    const arquivo = await this.repository.delete(id);

    if (!arquivo?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
