import { Aula } from 'src/aula/entities/aula.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Arquivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @ManyToOne(() => Aula, (aula) => aula.arquivos, {
    onDelete: 'CASCADE',
  })
  aula: Aula;
}
