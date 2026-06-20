import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from './shared/filters/appExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Associação Orquidofilia')
    .setDescription('API de gerenciamento de orquidários e reproduções')
    .setVersion('1.0')
    .addTag('orquidario-versao1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
  app.enableCors({origin: "http://localhost:4200", credentials:true, methods:['GET','POST','PATCH','PUT','DELETE','OPTIONS'],});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
