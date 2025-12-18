import { Injectable } from '@nestjs/common';

export type Admin = {
  userId: number;
  username: string;
  password: string;
};

const admins: Admin[] = [
  {
    userId:1,
    username: 'john',
    password: 'pokhara',
  },
];

@Injectable()
export class AdminService {
  async findAdmin(
    username: string
  ): Promise<Admin | undefined> {
    return admins.find(
      admin =>
        admin.username === username
       
    );
  }
}
