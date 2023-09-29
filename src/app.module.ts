import { Module,NestModule ,MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { User} from './entity/user.entity';
import {  LoggerMiddleware} from "./middleware/test.middleware";



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'sujanstha',
      password: '',
      database: 'nestjs',
      entities: [User],
      synchronize: true,
  }),

  UsersModule,
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
}
