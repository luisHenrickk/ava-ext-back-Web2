import { Professor } from './../../professor/entities/professor.entity';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateTelefoneDto {
  /**
   * O telefone do usuário cadastrado
   * @example 67999999999
   */
  @IsString()
  telefone: string;

  /**
   * O tipo de número cadastrado
   * @example Celular
   */
  @IsString()
  tipo: string;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsOptional()
  aluno?: Aluno;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsOptional()
  professor?: Professor;
}
