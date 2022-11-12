import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoModule } from './aluno/aluno.module';
import { CursoModule } from './curso/curso.module';
import { TelefoneModule } from './telefone/telefone.module';
import { ProfessorModule } from './professor/professor.module';
import { CertificadoModule } from './certificado/certificado.module';
import { ModuloModule } from './modulo/modulo.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { QuestaoModule } from './questao/questao.module';
import { AulaModule } from './aula/aula.module';
import { ArquivoModule } from './arquivo/arquivo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/banco.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AlunoModule,
    CursoModule,
    TelefoneModule,
    ProfessorModule,
    CertificadoModule,
    ModuloModule,
    AvaliacaoModule,
    QuestaoModule,
    AulaModule,
    ArquivoModule,
    AuthModule,
    UsuarioModule,
    AdminModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, UsuarioService],
})
export class AppModule {}
