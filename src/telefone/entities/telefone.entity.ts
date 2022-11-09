import { Professor } from './../../professor/entities/professor.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Telefone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telefone: string;

  @Column()
  tipo: string;

  @ManyToOne(() => Aluno, (aluno) => aluno.telefones, {
    onDelete: 'CASCADE',
  })
  aluno?: Aluno;

  @ManyToOne(() => Professor, (professor) => professor.telefones, {
    onDelete: 'CASCADE',
  })
  professor?: Professor;
}
