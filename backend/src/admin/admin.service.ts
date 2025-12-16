import { Injectable } from '@nestjs/common';

export type Admin = {
  username: string;
  password: string;
};

const admins: Admin[] = [
  {
    username: 'john',
    password: 'pokhara',
  },
];

@Injectable()
export class AdminService {
  async findAdmin(
    username: string,
    password: string,
  ): Promise<Admin | undefined> {
    return admins.find(
      admin =>
        admin.username === username &&
        admin.password === password,
    );
  }
}
