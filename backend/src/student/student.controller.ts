import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentService.create(createStudentDto);
    return {
      message: 'Registration successful!',
      data: student,
    };
  }

  @Get()
  async findAll() {
    const students = await this.studentService.findAll();
    return {
      message: 'Students retrieved successfully',
      data: students,
      count: students.length,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const student = await this.studentService.findOne(id);
    return {
      message: 'Student retrieved successfully',
      data: student,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.studentService.delete(id);
    return {
      message: 'Student deleted successfully',
    };
  }
}
