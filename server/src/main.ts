import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useLogger(logger);
  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle('Software_Hub-API')
    .setDescription(`The Software_Hub-API será uma API de entrega para o
      software da software-hun Unitins, Universidade Estadual do Tocantins,
      onde será um sistema de documentos, para oficialização de propriedade intelectual
      no software de computadores! Projeto dedicado a inciação científica do PIBITI, 
      juntamente com o Ministério da Ciência e Tecnologia.
      Desenvolvido pelo aluno: João Victor Póvoa França. github.com/JoaoIto`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3333);
  logger.log("Conexão estabelecida com o BD!")
}
bootstrap();