import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME ?? 'admin123';
  const password = process.env.ADMIN_PASSWORD ?? 'Solution@25';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const hashed = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { username },
    update: {
      password: hashed,
    },
    create: {
      username,
      password: hashed,
    },
  });

  console.log(`Admin ready: ${username}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
