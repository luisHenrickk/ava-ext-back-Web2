import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Curso } from './entities/curso.entity';
import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { RecordNotFoundException } from '@exceptions';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { AddAlunoDto } from './dto/add-aluno.dto';
import { AlunoService } from 'src/aluno/aluno.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso) private repository: Repository<Curso>,
    @InjectRepository(Aluno) private alunoRepository: Repository<Aluno>,
    private readonly alunoService: AlunoService,
  ) {}

  create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const curso: Curso = this.repository.create(createCursoDto);
    createCursoDto.alunos?.forEach((aluno) => {
      curso.alunos.push(this.alunoRepository.create(aluno));
    });
    return this.repository.save(curso);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Curso>> {
    const where: FindManyOptions<Curso> = {};
    if (search) {
      where.where = [
        { descricao: ILike(`%${search}%`) },
        { area: ILike(`%${search}%`) },
      ];
    }

    return paginate<Curso>(this.repository, options, where);
  }

  async findOne(id: number) {
    const curso = await this.repository.findOneBy({ id });

    if (!curso) {
      throw new RecordNotFoundException();
    }

    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    await this.repository.update(id, updateCursoDto);
    const curso = await this.repository.findOneBy({ id });
    if (!curso) {
      throw new RecordNotFoundException();
    }

    return curso;
  }

  async remove(id: number) {
    const curso = await this.repository.delete(id);

    if (!curso?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }

  async addAluno(
    id: number,
    relationEntityDto: RelationEntityDto,
  ): Promise<Curso> {
    const curso = await this.findOne(id);
    if (!curso.alunos) {
      curso.alunos = [];
    }

    const aluno = await this.alunoRepository.findOneBy({
      id: relationEntityDto.id,
    });
    if (!aluno) {
      throw new RecordNotFoundException();
    }
    curso.alunos.push(aluno);

    return this.repository.save(curso);
  }
}
