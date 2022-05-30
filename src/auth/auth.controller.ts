import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.huard';
import { AuthRequest } from './models/AuthRequest';
import { UserToken } from './models/UserToken';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest): Promise<UserToken> {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
