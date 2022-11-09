import { CursoModule } from './../curso/curso.module';
import { AlunoModule } from './../aluno/aluno.module';
import { forwardRef, Module } from '@nestjs/common';
import { AulaService } from './aula.service';
import { AulaController } from './aula.controller';
import { Aula } from './entities/aula.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoService } from 'src/aluno/aluno.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aula]),
    forwardRef(() => AlunoModule),
    forwardRef(() => CursoModule),
  ],
  controllers: [AulaController],
  providers: [AulaService, AlunoService],
  exports: [TypeOrmModule],
})
export class AulaModule {}
