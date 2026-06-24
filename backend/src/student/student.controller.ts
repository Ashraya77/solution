import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('students')
@UseGuards(AdminGuard)
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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.studentService.update(id, updateStudentDto);
    return {
      message: 'Student updated successfully',
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
