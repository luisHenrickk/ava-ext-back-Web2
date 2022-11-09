import { Aula } from './../../aula/entities/aula.entity';
import { Avaliacao } from './../../avaliacao/entities/avaliacao.entity';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Curso } from 'src/curso/entities/curso.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateModuloDto {
  /**
   * A frequência do aluno no módulo
   * @example 70
   */
  @IsInt()
  frequenciaMinima: number;

  /**
   * Um título ou descrição para o módulo
   * @example Introdução ao C
   */
  @IsString()
  descricao: string;

  /**
   * O nível de complexidade do módulo
   * @example Fácil
   */
  @IsString()
  nivel: string;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  curso: Curso;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  avaliacoes?: Avaliacao[];

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  aulas?: Aula[];
}
