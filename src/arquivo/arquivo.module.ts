import { Module } from '@nestjs/common';
import { ArquivoService } from './arquivo.service';
import { ArquivoController } from './arquivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arquivo } from './entities/arquivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arquivo])],
  controllers: [ArquivoController],
  providers: [ArquivoService],
  exports: [TypeOrmModule],
})
export class ArquivoModule {}
