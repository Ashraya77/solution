import { Injectable } from '@nestjs/common';

export type Admin = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class AdminService {}
