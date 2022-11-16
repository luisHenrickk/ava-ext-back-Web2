import { Usuario } from '../../usuario/entities/usuario.entity';
import { Certificado } from 'src/certificado/entities/certificado.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { Telefone } from 'src/telefone/entities/telefone.entity';
import { ChildEntity, Column, OneToMany } from 'typeorm';

@ChildEntity()
export class Professor extends Usuario {
  @Column({ length: 255 })
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  dataNasc: string;

  @Column()
  graduacao: string;

  @OneToMany(() => Telefone, (telefone) => telefone.professor, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  telefones?: Telefone[];

  @OneToMany(() => Curso, (curso) => curso.professor, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cursos?: Curso[];

  @OneToMany(() => Certificado, (certificado) => certificado.professor, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  certificados?: Certificado[];
}
