import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Curso } from 'src/curso/entities/curso.entity';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor) private repository: Repository<Professor>,
    @InjectRepository(Curso) private cursoRepository: Repository<Curso>,
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const professor: Professor = this.repository.create(createProfessorDto);
    professor.role = 'professor';
    const { senha, ...result } = await this.repository.save(professor);
    return result as Professor;
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Professor>> {
    const where: FindManyOptions<Professor> = {};
    if (search) {
      where.where = [
        { nome: ILike(`%${search}%`) },
        { cpf: ILike(`%${search}%`) },
        { dataNasc: ILike(`%${search}%`) },
        { telefones: ILike(`%${search}%`) },
        { cursos: ILike(`%${search}%`) },
      ];
    }

    return paginate<Professor>(this.repository, options, where);
  }

  async findOne(id: number): Promise<Professor> {
    const professor = await this.repository.findOneBy({ id });

    if (!professor) {
      throw new RecordNotFoundException();
    }

    return professor;
  }

  async update(
    id: number,
    updateProfessorDto: UpdateProfessorDto,
  ): Promise<Professor> {
    await this.repository.update(id, updateProfessorDto);
    const professor = await this.repository.findOneBy({ id });
    if (!professor) {
      throw new RecordNotFoundException();
    }

    return professor;
  }

  async remove(id: number) {
    const professor = await this.repository.delete(id);

    if (!professor?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
