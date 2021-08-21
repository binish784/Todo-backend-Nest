import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Module({
  imports:[MongooseModule.forFeature([{name:UserModel.name,schema:UserSchema}])],
  providers: [UsersService,UserRepository],
  controllers: [UsersController],
  exports:[UsersService]
})

export class UsersModule {}