import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'sqlite',
      database: 'db/test.db',
      entities: [User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User], 'default'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
