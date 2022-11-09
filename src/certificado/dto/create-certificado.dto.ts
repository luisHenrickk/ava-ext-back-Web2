import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Professor } from 'src/professor/entities/professor.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateCertificadoDto {
  /**
   * Área profissional do certificado
   * @example Sistemas de Informação - USP
   */
  @IsString()
  areaCertificado: string;

  /**
   * Link do certificado
   * @example www.certificadoDigital.com/certificado13
   */
  @IsString()
  link: string;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  professor: Professor;
}
