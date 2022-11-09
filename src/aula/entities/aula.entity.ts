import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Arquivo } from 'src/arquivo/entities/arquivo.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Aula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column()
  duracao: string;

  @OneToMany(() => Arquivo, (arquivo) => arquivo.aula, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  arquivos?: Arquivo[];

  @ManyToOne(() => Modulo, (modulo) => modulo.aulas, {
    onDelete: 'CASCADE',
  })
  modulo: Modulo;

  @ManyToMany(() => Aluno, (aluno) => aluno.aulas, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'aulas_alunos' })
  alunos?: Aluno[];
}
