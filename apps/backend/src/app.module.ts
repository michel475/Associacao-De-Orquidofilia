import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module'; 
import { User } from './modules/users/user.entity';
import { MailerModule } from './modules/mailer/mailer.module';
import { OrquidarioOrmEntity } from './modules/orquidario/infrastructure/persistence/typeorm/orquidario.orm-entity'; 
import { ReproducaoFlorOrmEntity } from './modules/reproducaoFlor/infrastructure/persistence/typeorm/reproducaoFlor.orm-entity';
import { OrquidarioModule } from './modules/orquidario/orquidario.module'; 
import { ReproducaoFlorModule } from './modules/reproducaoFlor/reproducaoFlor.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_NAME || 'database.sqlite',
      entities: [User, OrquidarioOrmEntity, ReproducaoFlorOrmEntity],
      synchronize: true, // Use with caution in prod
      logging: true,
    }),
    UsersModule,
    AuthModule,
    MailerModule,
    OrquidarioModule,
    ReproducaoFlorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }