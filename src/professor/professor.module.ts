import { CursoModule } from './../curso/curso.module';
import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor]), CursoModule],
  controllers: [ProfessorController],
  providers: [ProfessorService],
  exports: [TypeOrmModule],
})
export class ProfessorModule {}
