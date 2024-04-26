import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user) throw new UnauthorizedException();

    const passwordIsMatched = await argon2.verify(user.password, password);

    if (user && passwordIsMatched) {
      return user;
    }
    throw new UnauthorizedException('User or password is incorrect');
  }
}
