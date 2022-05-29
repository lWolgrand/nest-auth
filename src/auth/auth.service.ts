import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

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
  login() {
    return {
      message: 'login success',
    };
  }
}
