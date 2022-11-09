import { RelationEntityDto } from './../../shared/dto/relation-entity.dto';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Aluno } from 'src/aluno/entities/aluno.entity';

export class AddAlunoDto {
  /**
   * Informar apenas o campo do id do aluno array do JSON
   */
  @ValidateNested({ each: true })
  @Type(() => RelationEntityDto)
  @IsArray()
  alunos: Aluno[];
}
