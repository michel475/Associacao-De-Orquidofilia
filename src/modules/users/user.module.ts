import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/user.service';
import { UsersController } from './presentation/user.controller';
import { SeedService } from './application/seed';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    MailerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, SeedService],
  exports: [UsersService],
})
export class UsersModule {}