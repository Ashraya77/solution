import { PaymentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  fullName: string;

  @IsDateString({}, { message: 'Date of birth is required' })
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  @IsString()
  @MinLength(7, { message: 'Valid phone number required' })
  phone: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(3, { message: 'Please enter the address' })
  address: string;

  @IsString()
  @MinLength(2, { message: 'Guardian name is required' })
  guardianName: string;

  @IsString()
  @MinLength(7, { message: 'Guardian phone is required' })
  guardianPhone: string;

  @IsString()
  @IsNotEmpty({ message: 'Course name is required' })
  courseName: string;

  @IsDateString({}, { message: 'Admission date is required' })
  admissionDate: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Fee amount must be a number' })
  @Min(0, { message: 'Fee amount cannot be negative' })
  feeAmount: number;

  @IsEnum(PaymentStatus, { message: 'Payment status is invalid' })
  paymentStatus: PaymentStatus;

  @IsString()
  @IsOptional()
  remarks?: string;
}
