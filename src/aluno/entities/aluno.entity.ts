import { Aula } from 'src/aula/entities/aula.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { Telefone } from 'src/telefone/entities/telefone.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ChildEntity, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@ChildEntity()
export class Aluno extends Usuario {
  @Column({ length: 255 })
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  dataNasc: string;

  @OneToMany(() => Telefone, (telefone) => telefone.aluno, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  telefones?: Telefone[];

  @ManyToMany(() => Curso, (curso) => curso.alunos, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'cursos_alunos' })
  cursos?: Curso[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.aluno, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  avaliacoes?: Avaliacao[];

  @ManyToMany(() => Aula, (aula) => aula.alunos, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'aulas_alunos' })
  aulas?: Aula[];
}
