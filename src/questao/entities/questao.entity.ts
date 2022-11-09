import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Questao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enunciado: string;

  @Column()
  resposta?: string;

  @ManyToOne(() => Avaliacao, (avaliacao) => avaliacao.questoes, {
    onDelete: 'CASCADE',
  })
  avaliacao: Avaliacao;
}
