import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'src/const/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt-strategy';
import { LocalStrategy } from './strategy/local-strategy';

@Module({
  imports: [ 
    UsersModule , 
    PassportModule, 
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {expiresIn: jwtConfig.tokenExpiry}
    })
  ],
  controllers: [ AuthController ],
  providers: [ AuthService , LocalStrategy, JwtStrategy ]
})
export class AuthModule {}
