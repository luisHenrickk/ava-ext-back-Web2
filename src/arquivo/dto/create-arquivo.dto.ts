import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Aula } from 'src/aula/entities/aula.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateArquivoDto {
  /**
   * Qualquer arquivo que irá ser disponibilizado na aula
   * @example wwww.youtube.com/aula1
   */
  @IsString()
  descricao: string;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  aula: Aula;
}
