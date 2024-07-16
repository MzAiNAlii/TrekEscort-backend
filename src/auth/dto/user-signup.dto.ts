import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UserSignupDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  cnic_number: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  role: Role;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profile_picture?: string;
}
