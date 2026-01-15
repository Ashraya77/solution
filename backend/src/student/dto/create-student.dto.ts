/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  fullName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(10, { message: 'Valid phone number required' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of birth is required' })
  dob: string;

  @IsString()
  @IsNotEmpty({ message: 'Please select a course' })
  course: string;

  @IsString()
  @MinLength(5, { message: 'Please enter your full address' })
  address: string;

  @IsString()
  @MinLength(10, { message: 'Please tell us a bit more (min 10 chars)' })
  message: string;
}
