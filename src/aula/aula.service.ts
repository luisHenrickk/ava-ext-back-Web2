import { AlunoService } from './../aluno/aluno.service';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Aula } from './entities/aula.entity';
import { AddAlunoDto } from './dto/add-aluno.dto';

@Injectable()
export class AulaService {
  constructor(
    @InjectRepository(Aula) private repository: Repository<Aula>,
    @InjectRepository(Aluno) private alunoRepository: Repository<Aluno>,
    private readonly alunoService: AlunoService,
  ) {}

  create(createAulaDto: CreateAulaDto): Promise<Aula> {
    const aula: Aula = this.repository.create(createAulaDto);
    createAulaDto.alunos?.forEach((aluno) => {
      aula.alunos.push(this.alunoRepository.create(aluno));
    });
    return this.repository.save(aula);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Aula>> {
    const where: FindManyOptions<Aula> = {};
    if (search) {
      where.where = [
        { descricao: ILike(`%${search}%`) },
        { duracao: ILike(`%${search}%`) },
      ];
    }

    return paginate<Aula>(this.repository, options, where);
  }

  async findOne(id: number) {
    const aula = await this.repository.findOneBy({ id });

    if (!aula) {
      throw new RecordNotFoundException();
    }

    return aula;
  }

  async update(id: number, updateAulaDto: UpdateAulaDto): Promise<Aula> {
    await this.repository.update(id, updateAulaDto);
    const aula = await this.repository.findOneBy({ id });
    if (!aula) {
      throw new RecordNotFoundException();
    }

    return aula;
  }

  async remove(id: number) {
    const aula = await this.repository.delete(id);

    if (!aula?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }

  async addAluno(id: number, addAlunoDto: AddAlunoDto): Promise<Aula> {
    const aula = await this.findOne(id);
    if (!aula.alunos) {
      aula.alunos = [];
    }

    for (let i = 0; i < addAlunoDto.alunos.length; i++) {
      const aux = await this.alunoService.findOne(addAlunoDto.alunos[i].id);
      aula.alunos.push(aux);
    }

    return this.repository.save(aula);
  }
}
