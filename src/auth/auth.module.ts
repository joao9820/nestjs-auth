import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from '../jwt-strategy/jwt-strategy.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

//Aqui geramos o token, portanto se tratando de certificados, é onde ficaria a chave privada
//Não é possível utilizar o process.env.JWT_SECRET aqui, portanto a solução foi utilizar o ConfigService do próprio nest
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
