import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useLogger(logger);
  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle('Software_Hub-API')
    .setDescription('The Software_Hub-API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
  console.log('Conexão estabelecida');
}
bootstrap();