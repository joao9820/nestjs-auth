import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { Role } from './role.decorator';
import { RoleGuard } from '../role/role.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body) {
    //Continuar video a partir de 01:42:00 com o arquivo jwt.ts

    try {
      return { token: this.authService.execute(body.username, body.password) };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  //Ordem dos guards, primeiro autenticamos, depois autorizamos
  @Role('admin')
  @UseGuards(JwtGuard, RoleGuard) //podemos utilizar para proteger um controller tbm ao invés de um método
  @Get('test-auth')
  test(@Req() req) {
    console.log(req.user);
    return 'João Victor';
  }
}
