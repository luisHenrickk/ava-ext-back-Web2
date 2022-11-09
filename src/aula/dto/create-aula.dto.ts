import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAlunoDto } from 'src/aluno/dto/create-aluno.dto';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Arquivo } from 'src/arquivo/entities/arquivo.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateAulaDto {
  /**
   * Titulo da aula, sendo a sua descrição
   * @example Aula 01
   */
  @IsString()
  descricao: string;

  /**
   * Tempo de duração da aula
   * @example 30 min
   */
  @IsString()
  duracao: string;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  arquivos?: Arquivo[];

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  modulo: Modulo;

  @ValidateNested({ each: true })
  @Type(() => CreateAlunoDto)
  @IsArray()
  @IsObject()
  @IsOptional()
  alunos?: Aluno[];
}
