import { forwardRef, Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { AlunoModule } from 'src/aluno/aluno.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avaliacao]),
    forwardRef(() => AlunoModule),
  ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
  exports: [TypeOrmModule],
})
export class AvaliacaoModule {}
