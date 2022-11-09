import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Questao } from 'src/questao/entities/questao.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateAvaliacaoDto {
  /**
   * Metodo avaliativo sendo por nota ou frequência
   * @example Nota
   */
  @IsString()
  metodoAvaliativo: string;

  /**
   * Uma descrição para nomear a avaliação
   * @example Prova Optativa
   */
  @IsString()
  descricao: string;

  /**
   * Nota atribuida ao aluno caso método avaliativo for nota
   * @example 10
   */
  @IsNumber()
  @IsOptional()
  nota?: number;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  questoes?: Questao[];

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  modulo: Modulo;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsOptional()
  aluno?: Aluno;
}
