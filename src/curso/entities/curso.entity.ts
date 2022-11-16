import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Modulo } from 'src/modulo/entities/modulo.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  area: string;

  @ManyToMany(() => Aluno, (aluno) => aluno.cursos, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({ name: 'cursos_alunos' })
  alunos?: Aluno[];

  @ManyToOne(() => Professor, (professor) => professor.cursos, {
    eager: true,
    onDelete: 'CASCADE',
  })
  professor?: Professor;

  @OneToMany(() => Modulo, (modulo) => modulo.curso, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  modulos?: Modulo[];
}
