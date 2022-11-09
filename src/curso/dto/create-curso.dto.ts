import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAlunoDto } from 'src/aluno/dto/create-aluno.dto';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';

export class CreateCursoDto {
  /**
   * O nome do curso que está sendo cadastrado
   * @example Sistemas de Informação
   */
  @IsString()
  descricao: string;

  /**
   * A área do curso
   * @example Tecnologia
   */
  @IsEmail()
  area: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAlunoDto)
  @IsArray()
  @IsOptional()
  alunos?: Aluno[];

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsOptional()
  professor?: Professor;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  modulos?: Modulo[];
}
