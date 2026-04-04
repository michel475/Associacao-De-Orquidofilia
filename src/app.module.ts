import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReproducaoFlorModule } from './modules/reproducaoFlor/reproducaoFlor.module';
import { DatabaseModule } from './shared/database/typeorm.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrquidarioModule } from './modules/orquidario/orquidario.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/',
  }), DatabaseModule, OrquidarioModule, ReproducaoFlorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }