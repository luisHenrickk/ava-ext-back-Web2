import { hashSync } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  senha?: string;

  @Column()
  role: string;

  @BeforeInsert()
  hashPassword() {
    this.senha = hashSync(this.senha, 10);
  }
}
