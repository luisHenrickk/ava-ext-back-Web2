import { Telefone } from './entities/telefone.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TelefoneService } from './telefone.service';
import { TelefoneController } from './telefone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Telefone]),
    forwardRef(() => CursoModule),
  ],
  controllers: [TelefoneController],
  providers: [TelefoneService],
  exports: [TypeOrmModule],
})
export class TelefoneModule {}
