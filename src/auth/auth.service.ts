import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserSignupDto } from './dto/user-signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private assignJwtToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }

  private hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async signup(payload: UserSignupDto) {
    try {
      payload.password = this.hashPassword(payload.password);
      const user = await this.userService.create(payload);
      return {
        message: 'Signup Successfully',
        data: user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ConflictException('Email Aleady Exist');
        }
      }
      throw error;
    }
  }

  async login(payload: LoginDto) {
    try {
      const user = await this.userService.findUserByNameOrEmail(payload);

      if (!user) {
        throw new ForbiddenException('Invalid Credentials');
      }
      const matchPassword = bcrypt.compareSync(payload.password, user.password);
      if (!matchPassword) {
        throw new ForbiddenException('Invalid Credentials');
      }
      const token = this.assignJwtToken(user);

      delete user.password;
      return {
        message: 'Login Sucessfully',
        data: {
          ...user,
          token,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
