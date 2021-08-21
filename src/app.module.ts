import { Module } from '@nestjs/common';
import { TodoModule } from './controllers/todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './controllers/users/users.module';
import dbConfig from './config/database';
import { AuthModule } from './controllers/auth/auth.module';
import { JwtAuthGuard } from './guards/jwt-authGuards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.connectionString),
    AuthModule,
    TodoModule,
    UsersModule,
  ],
  // Global Guards
  // providers:[
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  // ]
})

export class AppModule {}
