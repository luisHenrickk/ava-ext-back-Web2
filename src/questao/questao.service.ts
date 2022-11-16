import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateQuestaoDto } from './dto/create-questao.dto';
import { UpdateQuestaoDto } from './dto/update-questao.dto';
import { Questao } from './entities/questao.entity';

@Injectable()
export class QuestaoService {
  constructor(
    @InjectRepository(Questao) private repository: Repository<Questao>,
  ) {}

  create(createQuestaoDto: CreateQuestaoDto): Promise<Questao> {
    const questao: Questao = this.repository.create(createQuestaoDto);
    return this.repository.save(questao);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Questao>> {
    const where: FindOptionsWhere<Questao> = {};

    if (search) {
      where.enunciado = ILike(`%${search}%`);
    }

    return paginate<Questao>(this.repository, options, { where });
  }

  async findOne(id: number) {
    const questao = await this.repository.findOneBy({ id });

    if (!questao) {
      throw new RecordNotFoundException();
    }

    return questao;
  }

  async update(
    id: number,
    updateQuestaoDto: UpdateQuestaoDto,
  ): Promise<Questao> {
    await this.repository.update(id, updateQuestaoDto);
    const questao = await this.repository.findOneBy({ id });
    if (!questao) {
      throw new RecordNotFoundException();
    }

    return questao;
  }

  async remove(id: number) {
    const questao = await this.repository.delete(id);

    if (!questao?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
