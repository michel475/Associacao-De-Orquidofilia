import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======

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

>>>>>>> dca8e41 (reajuste no main para descrição da api)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
