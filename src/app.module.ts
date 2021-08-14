import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './controllers/todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './config/database';
@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(dbConfig.connectionString)
  ],
})

export class AppModule {}
