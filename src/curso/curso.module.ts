import { AulaModule } from './../aula/aula.module';
import { AlunoService } from './../aluno/aluno.service';
import { Curso } from './entities/curso.entity';
import { forwardRef, Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoModule } from 'src/aluno/aluno.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    forwardRef(() => AlunoModule),
    forwardRef(() => AulaModule),
  ],
  controllers: [CursoController],
  providers: [CursoService, AlunoService],
  exports: [TypeOrmModule],
})
export class CursoModule {}
