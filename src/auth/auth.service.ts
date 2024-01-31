import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

//Ao utilizar enums, temos uma faixa de valores, e conseguimos usar variáveis ao invés de strings
enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  OUTRO = 'outro',
}

const users = [
  {
    id: 1,
    username: 'user@user.com',
    password: '$2b$10$WTMA9O2gte.MPDz0GJv3H.MWqv6wtrnvLmnzr8XTzMeMWqqXVyx8i',
    role: Roles.ADMIN,
  },
  {
    id: 2,
    username: 'user2@user.com',
    password: '2b$10$sx6m6lXkKm0c4f5piBEahuY8U2JR/DnHh/K1j4YnksSwchhNv93t6',
    role: Roles.USER,
  },
  {
    id: 3,
    username: 'user3@user.com',
    password: '$2b$10$WTMA9O2gte.MPDz0GJv3H.MWqv6wtrnvLmnzr8XTzMeMWqqXVyx8i',
    role: Roles.OUTRO,
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  execute(username: string, password: string) {
    try {
      const user = this.validateCredentials(username, password);

      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
      };

      return this.jwtService.sign(payload);
    } catch (err) {
      throw err;
    }
  }

  validateCredentials(username: string, password: string) {
    const user = users.find(
      (us) =>
        us.username === username && bcrypt.compareSync(password, us.password),
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
