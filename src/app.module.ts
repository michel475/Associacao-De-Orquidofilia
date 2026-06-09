import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReproducaoFlorModule } from './modules/reproducaoFlor/reproducaoFlor.module';
import { DatabaseModule } from './shared/database/typeorm.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrquidarioModule } from './modules/orquidario/orquidario.module';

@Module({
  imports: [DatabaseModule, OrquidarioModule, ReproducaoFlorModule,
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/',
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }