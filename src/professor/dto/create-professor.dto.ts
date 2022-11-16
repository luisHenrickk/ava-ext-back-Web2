import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Certificado } from 'src/certificado/entities/certificado.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { Telefone } from 'src/telefone/entities/telefone.entity';

export class CreateProfessorDto {
  /**
   * O nome do professor que está sendo cadastrado
   * @example Humberto
   */
  @IsString()
  nome: string;

  /**
   * O e-mail do professor que está sendo cadastrado
   * @example email@email.com
   */
  @IsEmail()
  email: string;

  /**
   * O CPF do professor que está sendo cadastrado
   * @example 000.000.000-00
   */
  @IsString()
  cpf: string;

  /**
   * A data de nascimento do professor que está sendo cadastrado
   * @example 26/09/2002
   */
  @IsString()
  dataNasc: string;

  /**
   * A graduação do professor que está sendo cadastrado
   * @example 26/09/2002
   */
  @IsString()
  graduacao: string;

  /**
   * A senha que o professor irá utilizar para entrar no sistema
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
  @IsOptional()
  telefones?: Telefone[];

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  cursos?: Curso[];

  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsArray()
  @IsOptional()
  certificados?: Certificado[];
}
