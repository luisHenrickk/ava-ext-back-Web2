import { Aula } from './../../aula/entities/aula.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Modulo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  frequenciaMinima: number;

  @Column()
  descricao: string;

  @Column()
  nivel: string;

  @ManyToOne(() => Curso, (curso) => curso.modulos, {
    onDelete: 'CASCADE',
    eager: true,
  })
  curso: Curso;

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.modulo, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  avaliacoes?: Avaliacao[];

  @OneToMany(() => Aula, (aula) => aula.modulo, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  aulas?: Aula[];
}
