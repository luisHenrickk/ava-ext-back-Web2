import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Aula } from 'src/aula/entities/aula.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { CreateCursoDto } from 'src/curso/dto/create-curso.dto';
import { Curso } from 'src/curso/entities/curso.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { Telefone } from 'src/telefone/entities/telefone.entity';

export class CreateAlunoDto {
  /**
   * O nome do aluno que está sendo cadastrado
   * @example Luis Henrick
   */
  @IsString()
  nome: string;

  /**
   * O e-mail do aluno que está sendo cadastrado
   * @example email@email.com
   */
  @IsEmail()
  email: string;

  /**
   * O CPF do aluno que está sendo cadastrado
   * @example 000.000.000-00
   */
  @IsString()
  cpf: string;

  /**
   * A data de nascimento do aluno que está sendo cadastrado
   * @example 26/09/2002
   */
  @IsString()
  dataNasc: string;

  /**
   * A senha que o aluno irá utilizar para entrar no sistema
   * @example 12345678
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsString()
  senha: string;

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsDefined()
  telefones: Telefone[];

  @ValidateNested({ each: true })
  @Type(() => CreateCursoDto)
  @IsArray()
  @IsObject()
  @IsOptional()
  cursos?: Curso[];

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  avaliacoes?: Avaliacao[];

  @ValidateNested({ each: true })
  @Type(() => CreateCursoDto)
  @IsArray()
  @IsObject()
  @IsOptional()
  aulas?: Aula[];
}
