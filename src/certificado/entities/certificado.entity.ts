import { Professor } from 'src/professor/entities/professor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Certificado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  areaCertificado: string;

  @Column()
  link: string;

  @ManyToOne(() => Professor, (professor) => professor.certificados, {
    onDelete: 'CASCADE',
  })
  professor: Professor;
}
