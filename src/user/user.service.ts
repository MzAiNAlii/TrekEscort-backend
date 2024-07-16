import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserSignupDto } from 'src/auth/dto/user-signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: UserSignupDto) {
    const user = await this.prisma.user.create({
      data: {
        ...payload,
      },
    });
    delete user.password;
    return user;
  }

  async findUserByNameOrEmail(payload: LoginDto) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            name: payload.name,
          },
          { email: payload.email },
        ],
      },
    });
  }
}
