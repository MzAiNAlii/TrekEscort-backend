import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class LoginDto {
  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ValidateIf((o) => !o.name)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
