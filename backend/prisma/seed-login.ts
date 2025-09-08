import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo123", 10);
  await prisma.user.upsert({
    where: { email: "demo@demo.cl" },
    update: { passwordHash },
    create: { email: "demo@demo.cl", name: "Demo", passwordHash, role: "USER" },
  });
  console.log("Usuario listo: demo@demo.cl / demo123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
