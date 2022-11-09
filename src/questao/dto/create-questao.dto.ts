import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateQuestaoDto {
  /**
   * O enunciado da questão
   * @example Quanto é 1+1
   */
  @IsString()
  enunciado: string;

  /**
   * A resposta da questão
   * @example 2
   */
  @IsString()
  @IsOptional()
  resposta?: string;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  avaliacao: Avaliacao;
}
