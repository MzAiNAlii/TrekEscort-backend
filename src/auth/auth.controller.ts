import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() payload: UserSignupDto) {
    return this.authService.signup(payload);
  }

  @Post('login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }
}
