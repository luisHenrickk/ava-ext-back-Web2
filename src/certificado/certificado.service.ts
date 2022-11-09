import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { Certificado } from './entities/certificado.entity';

@Injectable()
export class CertificadoService {
  constructor(
    @InjectRepository(Certificado) private repository: Repository<Certificado>,
  ) {}

  create(createCertificadoDto: CreateCertificadoDto): Promise<Certificado> {
    const certificado: Certificado =
      this.repository.create(createCertificadoDto);
    return this.repository.save(certificado);
  }

  findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Certificado>> {
    const where: FindManyOptions<Certificado> = {};
    if (search) {
      where.where = [
        { areaCertificado: ILike(`%${search}%`) },
        { link: ILike(`%${search}%`) },
        { professor: ILike(`%${search}%`) },
      ];
    }

    return paginate<Certificado>(this.repository, options, where);
  }

  async findOne(id: number): Promise<Certificado> {
    const certificado = await this.repository.findOneBy({ id });

    if (!certificado) {
      throw new RecordNotFoundException();
    }

    return certificado;
  }

  async update(
    id: number,
    updateCertificadoDto: UpdateCertificadoDto,
  ): Promise<Certificado> {
    await this.repository.update(id, updateCertificadoDto);
    const certificado = await this.repository.findOneBy({ id });
    if (!certificado) {
      throw new RecordNotFoundException();
    }

    return certificado;
  }

  async remove(id: number) {
    const certificado = await this.repository.delete(id);

    if (!certificado?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
