import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const email = createStudentDto.email.trim().toLowerCase();
    const existingStudent = await this.prisma.student.findFirst({
      where: { email },
    });

    if (existingStudent) {
      throw new BadRequestException('Email already registered');
    }

    return this.prisma.student.create({
      data: this.toCreateData(createStudentDto),
    });
  }

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    await this.findOne(id);

    if (updateStudentDto.email) {
      const email = updateStudentDto.email.trim().toLowerCase();
      const existingStudent = await this.prisma.student.findFirst({
        where: {
          email,
          NOT: { id },
        },
      });

      if (existingStudent) {
        throw new BadRequestException('Email already registered');
      }
    }

    return this.prisma.student.update({
      where: { id },
      data: this.toUpdateData(updateStudentDto),
    });
  }

  async delete(id: number): Promise<Student> {
    await this.findOne(id);

    return this.prisma.student.delete({
      where: { id },
    });
  }

  private toCreateData(dto: CreateStudentDto): Prisma.StudentCreateInput {
    return {
      fullName: dto.fullName.trim(),
      dateOfBirth: new Date(dto.dateOfBirth),
      gender: dto.gender.trim(),
      phone: dto.phone.trim(),
      email: dto.email.trim().toLowerCase(),
      address: dto.address.trim(),
      guardianName: dto.guardianName.trim(),
      guardianPhone: dto.guardianPhone.trim(),
      courseName: dto.courseName.trim(),
      admissionDate: new Date(dto.admissionDate),
      feeAmount: dto.feeAmount,
      paymentStatus: dto.paymentStatus,
      remarks: dto.remarks?.trim() ?? '',
    };
  }

  private toUpdateData(dto: UpdateStudentDto): Prisma.StudentUpdateInput {
    const data: Prisma.StudentUpdateInput = {};

    if (dto.fullName !== undefined) data.fullName = dto.fullName.trim();
    if (dto.dateOfBirth !== undefined)
      data.dateOfBirth = new Date(dto.dateOfBirth);
    if (dto.gender !== undefined) data.gender = dto.gender.trim();
    if (dto.phone !== undefined) data.phone = dto.phone.trim();
    if (dto.email !== undefined) data.email = dto.email.trim().toLowerCase();
    if (dto.address !== undefined) data.address = dto.address.trim();
    if (dto.guardianName !== undefined)
      data.guardianName = dto.guardianName.trim();
    if (dto.guardianPhone !== undefined) {
      data.guardianPhone = dto.guardianPhone.trim();
    }
    if (dto.courseName !== undefined) data.courseName = dto.courseName.trim();
    if (dto.admissionDate !== undefined) {
      data.admissionDate = new Date(dto.admissionDate);
    }
    if (dto.feeAmount !== undefined) data.feeAmount = dto.feeAmount;
    if (dto.paymentStatus !== undefined) data.paymentStatus = dto.paymentStatus;
    if (dto.remarks !== undefined) data.remarks = dto.remarks.trim();

    return data;
  }
}
