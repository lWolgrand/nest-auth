import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  login() {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly userService: UserService) { }

  validateUser(email: string, password: string): void {
    const user = this.userService.findByEmail(email);
  }

  // login() {
  //   throw new Error('Method not implemented.');
  // }
}
