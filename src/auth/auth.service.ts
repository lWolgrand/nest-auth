import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken: string = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findByEmail(email);

    if (user) {
      const isValid: boolean = await bcrypt.compare(password, user.password);
      if (isValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Invalid credentials');
  }
}
