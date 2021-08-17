import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './config/database';

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.connectionString),
    TodoModule
  ],
})

export class AppModule {}
