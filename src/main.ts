import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trek Escort')
    .setDescription('The Trek Escort App backend')
    .setVersion('1.0')
    .setContact(
      'Trek Escort',
      'https://trekescort.com',
      'trekescort@trekescort.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS
  app.enableCors();

  // logging
  app.use(morgan('tiny'));

  // Start
  await app.listen(3000);
}
bootstrap();
