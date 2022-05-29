import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserPayload } from './models/User.payload';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  login(user: User) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
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
