import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // Optional: Check if email already exists
    const existingStudent = await this.prisma.student.findFirst({
      where: { email: createStudentDto.email },
    });

    if (existingStudent) {
      throw new BadRequestException('Email already registered');
    }

    return this.prisma.student.create({
      data: createStudentDto,
    });
  }

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.prisma.student.findFirst({
      where: { email },
    });
  }

  async delete(id: number): Promise<Student> {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
