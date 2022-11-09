import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Aula } from 'src/aula/entities/aula.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno) private repository: Repository<Aluno>,
    @InjectRepository(Curso) private cursoRepository: Repository<Curso>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno: Aluno = this.repository.create(createAlunoDto);
    aluno.cursos = [];
    aluno.role = 'aluno';
    createAlunoDto.cursos?.forEach((curso) => {
      aluno.cursos.push(this.cursoRepository.create(curso));
    });
    createAlunoDto.aulas?.forEach((aula) => {
      aluno.aulas.push(this.aulaRepository.create(aula));
    });
    const { senha, ...result } = await this.repository.save(aluno);
    return result as Aluno;
  }

  findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Aluno>> {
    const where: FindManyOptions<Aluno> = {};
    if (search) {
      where.where = [
        { nome: ILike(`%${search}%`) },
        { cpf: ILike(`%${search}%`) },
        { dataNasc: ILike(`%${search}%`) },
        { telefones: ILike(`%${search}%`) },
        { cursos: ILike(`%${search}%`) },
        { avaliacoes: ILike(`%${search}%`) },
        { aulas: ILike(`%${search}%`) },
      ];
    }

    return paginate<Aluno>(this.repository, options, where);
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.repository.findOneBy({ id });

    if (!aluno) {
      throw new RecordNotFoundException();
    }

    return aluno;
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    await this.repository.update(id, updateAlunoDto);
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new RecordNotFoundException();
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.repository.delete(id);

    if (!user?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
