import { AulaModule } from './../aula/aula.module';
import { CursoModule } from './../curso/curso.module';
import { forwardRef, Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { AvaliacaoModule } from 'src/avaliacao/avaliacao.module';
import { TelefoneModule } from 'src/telefone/telefone.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno]),
    forwardRef(() => CursoModule),
    forwardRef(() => AulaModule),
    forwardRef(() => AvaliacaoModule),
    forwardRef(() => TelefoneModule),
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: [TypeOrmModule, AlunoService],
})
export class AlunoModule {}
