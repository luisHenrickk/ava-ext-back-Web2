import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { Questao } from 'src/questao/entities/questao.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metodoAvaliativo: string;

  @Column()
  descricao: string;

  @Column({ nullable: true })
  nota?: number;

  @OneToMany(() => Questao, (questao) => questao.avaliacao, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  questoes?: Questao[];

  @ManyToOne(() => Modulo, (modulo) => modulo.avaliacoes, {
    onDelete: 'CASCADE',
  })
  modulo: Modulo;

  @ManyToOne(() => Aluno, (aluno) => aluno.avaliacoes, {
    onDelete: 'CASCADE',
  })
  aluno?: Aluno;
}
