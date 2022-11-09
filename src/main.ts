import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Trabalho Web II')
    .setVersion('1.0')
    .addTag('Autenticação')
    .addTag('Aluno')
    .addTag('Professor')
    .addTag('Curso')
    .addTag('Módulo')
    .addTag('Aula')
    .addTag('Arquivo')
    .addTag('Avaliação')
    .addTag('Questão')
    .addTag('Telefone')
    .addTag('Certificado')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
